import type { FrontmatterValue } from "@akasha/pages-system/markdown-document"
import type { ValueType } from "../markdown-document-shape/markdown-document-shape.module.code.ts"

export type Fault = { expected: string; measured: string }

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DAY = /^(\d{4})-(\d{2})-(\d{2})$/

export function describe(t: ValueType): string {
  switch (t.type) {
    case "slug":
      return "a kebab-case slug"
    case "text":
      return `text of at most ${t.maxChars} characters`
    case "pattern":
      return `text matching ${t.pattern}`
    case "enum":
      return `one of ${t.values.map((v) => `\`${v}\``).join(", ")}`
    case "date":
      return "a YYYY-MM-DD day"
    case "glob":
      return `a glob over the ${t.repo} repo`
    case "docref":
      return "a path"
    case "list":
      return `a list of ${describe(t.of)}`
    case "union":
      return t.of.map(describe).join(" or ")
  }
}

export function checkScalar(text: string, t: ValueType): Fault | null {
  const no = (measured: string): Fault => ({ expected: describe(t), measured })
  switch (t.type) {
    case "slug":
      return SLUG.test(text) ? null : no(`\`${text}\``)
    case "text":
      return text.length > t.maxChars ? no(`${text.length} characters`) : null
    case "pattern":
      if (text.length > t.backstop) return no(`${text.length} characters`)
      return t.pattern.test(text) ? null : no(`\`${text}\``)
    case "enum":
      return t.values.includes(text) ? null : no(`\`${text}\``)
    case "date": {
      const m = DAY.exec(text)
      if (!m) return no(`\`${text}\``)
      const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
      const real = new Date(Date.UTC(y, mo - 1, d))
      return real.getUTCMonth() === mo - 1 && real.getUTCDate() === d
        ? null
        : no(`\`${text}\`, which is not a day`)
    }
    case "glob":
      return text.length > 0 ? null : no("an empty glob")
    case "docref":
      return text.length > 0 ? null : no("nothing")
    case "list":
      return no(`the scalar \`${text}\``)
    case "union": {
      for (const each of t.of) if (checkScalar(text, each) === null) return null
      return no(`\`${text}\``)
    }
  }
}

export function checkValue(v: FrontmatterValue, t: ValueType): Fault | null {
  const no = (measured: string): Fault => ({ expected: describe(t), measured })
  if (t.type === "union") {
    for (const each of t.of) if (checkValue(v, each) === null) return null
    return no(kindOf(v))
  }
  if (t.type === "list") {
    if (v.kind !== "list") return no(kindOf(v))
    const n = v.items.length
    if (n < t.cardinality.least) return no(n === 0 ? "an empty list" : `${n} entries`)
    if (n > t.cardinality.max) return no(`${n} entries`)
    for (const item of v.items) {
      const f = checkValue(item, t.of)
      if (f) return f
    }
    return null
  }
  return v.kind === "scalar" ? checkScalar(v.value.text, t) : no(kindOf(v))
}

const kindOf = (v: FrontmatterValue): string =>
  v.kind === "scalar" ? `the scalar \`${v.value.text}\`` : v.kind === "list" ? "a list" : "a map"
