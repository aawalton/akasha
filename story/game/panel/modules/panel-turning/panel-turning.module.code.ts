const OFFERED = "akashaDrawing"

const CLIENT = /^"use client"\n+/

const IMPORTED = /import\s+(type\s+)?\{([\s\S]*?)\}\s+from\s+"([^"]+)"\n/g

const TYPED = "type "

function valuesIn(inside: string): string {
  return inside
    .split(",")
    .map((one) => one.trim())
    .filter((one) => one !== "" && !one.startsWith(TYPED))
    .join(", ")
}

export function turnedInto(text: string): string {
  return text
    .replace(CLIENT, "")
    .replace(IMPORTED, (_whole, typed: string | undefined, inside: string, spec: string) => {
      if (typed !== undefined) return ""
      const named = valuesIn(inside)
      if (named === "") return ""
      return `const { ${named} } = globalThis.${OFFERED}[${JSON.stringify(spec)}]\n`
    })
}
