import { expect, test } from "bun:test"
import type { PageType, Value, Values } from "../formula/formula.ts"
import { checkNaming, DEFAULT_NAME, type Naming, nameOf } from "./name.ts"

const TEXT = { kind: "text" } as const
const NUMBER = { kind: "number" } as const
const DATE = { kind: "date" } as const

const pageTypeOf = (extra: PageType = {}): PageType => ({
  slug: { type: TEXT },
  id: { type: TEXT },
  title: { type: TEXT },
  ...extra,
})

const valuesOf = (properties: Record<string, Value>): Values => ({ now: 0, properties })

const text = (of: string): Value => ({ kind: "text", text: of })

const naming = (pageType: PageType): Naming => {
  const checked = checkNaming(pageType)
  if (!checked.ok) throw new Error(`refused: ${checked.message}`)
  return checked
}

test("a page type declaring no name formula names its pages by their slug", () => {
  expect(
    nameOf(naming(pageTypeOf()), valuesOf({ slug: text("pilot"), id: text("019f-aaaa") }))
  ).toBe("pilot")
})

test("the default falls to the id where the page holds no slug", () => {
  expect(nameOf(naming(pageTypeOf()), valuesOf({ id: text("019f-aaaa") }))).toBe("019f-aaaa")
})

test("the default written out by hand names a page exactly as declaring nothing does", () => {
  const values = valuesOf({ id: text("019f-aaaa") })
  const declared = naming(pageTypeOf({ name: { type: TEXT, formula: DEFAULT_NAME } }))
  expect(nameOf(declared, values)).toBe(nameOf(naming(pageTypeOf()), values))
})

test("a page holding neither slug nor id is refused rather than named", () => {
  const answer = nameOf(naming(pageTypeOf()), valuesOf({ title: text("Pilot") }))
  expect(typeof answer).toBe("object")
  if (typeof answer === "string") throw new Error("named")
  expect(answer.absent).toEqual(["slug", "id"])
  expect(answer.message).toBe(
    "`{slug} ?? {id}` answers absent, nothing standing under `slug` and `id`"
  )
})

test("a page type's own name formula is used in place of the default", () => {
  const pageType = pageTypeOf({
    fingerprint: { type: TEXT },
    name: { type: TEXT, formula: "{fingerprint}" },
  })
  expect(
    nameOf(naming(pageType), valuesOf({ fingerprint: text("abc123"), slug: text("ignored") }))
  ).toBe("abc123")
})

test("a name formula answering absent refuses the page, naming the key nothing stands under", () => {
  const pageType = pageTypeOf({
    fingerprint: { type: TEXT },
    name: { type: TEXT, formula: "{fingerprint}" },
  })
  const answer = nameOf(naming(pageType), valuesOf({ slug: text("pilot") }))
  if (typeof answer === "string") throw new Error("named")
  expect(answer.absent).toEqual(["fingerprint"])
  expect(answer.formula).toBe("{fingerprint}")
})

test("a text literal joins references, and writes a date as it is written", () => {
  const pageType = pageTypeOf({
    "source-slug": { type: TEXT },
    date: { type: DATE },
    name: { type: TEXT, formula: '"{source-slug}-{date}"' },
  })
  const values = valuesOf({
    "source-slug": text("food"),
    date: { kind: "date", date: "2026-08-27" },
  })
  expect(nameOf(naming(pageType), values)).toBe("food-2026-08-27")
})

test("a text literal answers absent where any reference in it is absent", () => {
  const pageType = pageTypeOf({
    "source-slug": { type: TEXT },
    date: { type: DATE },
    name: { type: TEXT, formula: '"{source-slug}-{date}"' },
  })
  const answer = nameOf(naming(pageType), valuesOf({ "source-slug": text("food") }))
  if (typeof answer === "string") throw new Error("named")
  expect(answer.absent).toEqual(["date"])
})

test("a name resting on another computed key is worked out rather than read off the values", () => {
  const pageType = pageTypeOf({
    "app-slug": { type: TEXT },
    "build-number": { type: NUMBER },
    "build-number-text": { type: TEXT, formula: "text({build-number})" },
    name: { type: TEXT, formula: '"{app-slug}-{build-number-text}"' },
  })
  const values = valuesOf({
    "app-slug": text("temper"),
    "build-number": { kind: "number", number: 412 },
  })
  expect(nameOf(naming(pageType), values)).toBe("temper-412")
})

test("a value passed under a computed key is not trusted, the formula filling it standing instead", () => {
  const pageType = pageTypeOf({
    "app-slug": { type: TEXT },
    "build-number": { type: NUMBER },
    "build-number-text": { type: TEXT, formula: "text({build-number})" },
    name: { type: TEXT, formula: '"{app-slug}-{build-number-text}"' },
  })
  const values = valuesOf({
    "app-slug": text("temper"),
    "build-number": { kind: "number", number: 412 },
    "build-number-text": text("999"),
  })
  expect(nameOf(naming(pageType), values)).toBe("temper-412")
})

test("a name reaching a computed key blames the stored key nothing stands under, not the step", () => {
  const pageType = pageTypeOf({
    "app-slug": { type: TEXT },
    "build-number": { type: NUMBER },
    "build-number-text": { type: TEXT, formula: "text({build-number})" },
    name: { type: TEXT, formula: '"{app-slug}-{build-number-text}"' },
  })
  const answer = nameOf(naming(pageType), valuesOf({ "app-slug": text("temper") }))
  if (typeof answer === "string") throw new Error("named")
  expect(answer.absent).toEqual(["build-number"])
})

test("every stored key a name reaches is reported, through any computed key between", () => {
  const pageType = pageTypeOf({
    "app-slug": { type: TEXT },
    "build-number": { type: NUMBER },
    "build-number-text": { type: TEXT, formula: "text({build-number})" },
    name: { type: TEXT, formula: '"{app-slug}-{build-number-text}"' },
  })
  expect([...naming(pageType).reads].sort()).toEqual(["app-slug", "build-number"])
})

test("a whole number reaches a name through text(), and a fractional one refuses the page", () => {
  const pageType = pageTypeOf({
    seq: { type: NUMBER },
    name: { type: TEXT, formula: "text({seq}) ?? {slug} ?? {id}" },
  })
  expect(nameOf(naming(pageType), valuesOf({ seq: { kind: "number", number: 7 } }))).toBe("7")
  expect(
    nameOf(
      naming(pageType),
      valuesOf({ seq: { kind: "number", number: 7.5 }, slug: text("fell-back") })
    )
  ).toBe("fell-back")
})

test("a page type declaring neither slug nor id is refused, rather than naming its pages nothing", () => {
  const refused = checkNaming({ fingerprint: { type: TEXT } })
  if (refused.ok) throw new Error("checked")
  expect(refused.ok).toBe(false)
  expect(refused.message).toBe("no property is declared under the key `slug`")
})

test("a name declared to hold anything but text is refused", () => {
  const refused = checkNaming(
    pageTypeOf({ seq: { type: NUMBER }, name: { type: NUMBER, formula: "{seq}" } })
  )
  if (refused.ok) throw new Error("checked")
  expect(refused.keys).toEqual(["name"])
  expect(refused.message).toBe("a page's name is text, and `name` is declared to hold a number")
})

test("a name formula answering something other than text is refused when the page type is checked", () => {
  const refused = checkNaming(
    pageTypeOf({ seq: { type: NUMBER }, name: { type: TEXT, formula: "{seq}" } })
  )
  if (refused.ok) throw new Error("checked")
  expect(refused.message).toBe("`name` is declared a text, and its formula answers a number")
})

test("a name formula naming a key its page type does not declare is refused", () => {
  const refused = checkNaming(pageTypeOf({ name: { type: TEXT, formula: "{fingerprint}" } }))
  if (refused.ok) throw new Error("checked")
  expect(refused.message).toBe("no property is declared under the key `fingerprint`")
})

test("a cycle running through the name is refused", () => {
  const refused = checkNaming(
    pageTypeOf({ a: { type: TEXT, formula: "{name}" }, name: { type: TEXT, formula: "{a}" } })
  )
  if (refused.ok) throw new Error("checked")
  expect(refused.keys).toEqual(["a", "name"])
})

test("a page type wrong in a formula that is not its name is refused too, naming the key at fault", () => {
  const refused = checkNaming(pageTypeOf({ other: { type: TEXT, formula: "{nowhere}" } }))
  if (refused.ok) throw new Error("checked")
  expect(refused.keys).toEqual(["other"])
})

test("a name formula unreadable as text is refused at the moment it is read", () => {
  const refused = checkNaming(pageTypeOf({ name: { type: TEXT, formula: "{slug" } }))
  if (refused.ok) throw new Error("checked")
  expect(refused.moment).toBe("reading")
})

test("`??` falls past an absent left side to the right", () => {
  const pageType = pageTypeOf({ name: { type: TEXT, formula: "{title} ?? {slug} ?? {id}" } })
  expect(nameOf(naming(pageType), valuesOf({ slug: text("s"), id: text("i") }))).toBe("s")
  expect(nameOf(naming(pageType), valuesOf({ title: text("t"), slug: text("s") }))).toBe("t")
  expect(nameOf(naming(pageType), valuesOf({ id: text("i") }))).toBe("i")
})

test("a name is the text a formula answers, whatever characters that text holds", () => {
  const pageType = pageTypeOf({ key: { type: TEXT }, name: { type: TEXT, formula: "{key}" } })
  expect(nameOf(naming(pageType), valuesOf({ key: text("equip-type:EQUIP_TYPE_CHEST") }))).toBe(
    "equip-type:EQUIP_TYPE_CHEST"
  )
  expect(nameOf(naming(pageType), valuesOf({ key: text("aawalton@gmail.com") }))).toBe(
    "aawalton@gmail.com"
  )
})

test("every name formula this repository states passes its check", () => {
  const stated: readonly (readonly [string, PageType])[] = [
    ["{fingerprint}", pageTypeOf({ fingerprint: { type: TEXT } })],
    ["{external-id}", pageTypeOf({ "external-id": { type: TEXT } })],
    ["{external-id} ?? {slug} ?? {id}", pageTypeOf({ "external-id": { type: TEXT } })],
    ["{person-slug}", pageTypeOf({ "person-slug": { type: TEXT } })],
    ['"{source-slug}-{date}"', pageTypeOf({ "source-slug": { type: TEXT }, date: { type: DATE } })],
    ['"{persona-slug}-anchor"', pageTypeOf({ "persona-slug": { type: TEXT } })],
    [
      '"{person-slug}-{access-kind}-{target}"',
      pageTypeOf({
        "person-slug": { type: TEXT },
        "access-kind": { type: TEXT },
        target: { type: TEXT },
      }),
    ],
    [
      '"{branch}-{commit}" ?? {slug} ?? {id}',
      pageTypeOf({ branch: { type: TEXT }, commit: { type: TEXT } }),
    ],
    [
      '"{source-slug}-{seat-name}-{date}"',
      pageTypeOf({
        "source-slug": { type: TEXT },
        "seat-name": { type: TEXT },
        date: { type: DATE },
      }),
    ],
    ["{title} ?? {slug} ?? {id}", pageTypeOf()],
    ["{key}", pageTypeOf({ key: { type: TEXT } })],
    ["{companion-id} ?? {slug} ?? {id}", pageTypeOf({ "companion-id": { type: TEXT } })],
    ["{account-user-id} ?? {slug} ?? {id}", pageTypeOf({ "account-user-id": { type: TEXT } })],
    ["text({seq}) ?? {slug} ?? {id}", pageTypeOf({ seq: { type: NUMBER } })],
  ]
  for (const [formula, pageType] of stated) {
    const checked = checkNaming({ ...pageType, name: { type: TEXT, formula } })
    if (!checked.ok) throw new Error(`${formula} refused: ${checked.message}`)
    expect(checked.formula).toBe(formula)
  }
})
