const COLOR = /\|c[0-9a-fA-F]{6}|\|r/g

const COUNTED = /^\((\d+) (?:perfected )?items?\) ([\s\S]*)$/

const SCALED = "scales off"

const ANY_NUMBER = /\d+(?:\.\d+)?/g

const PLAIN_NUMBER = /\d+(?:\.\d+)?(?![\d.]*%)/g

export type SetLine = {
  readonly esoSetId: number
  readonly count: number
  readonly text: string
}

export type CatalogSet = {
  readonly esoSetId: number
  readonly lines: readonly { readonly count: number; readonly description: string }[]
}

export function setLineOf(esoSetId: number, description: string): SetLine | null {
  const found = COUNTED.exec(description.replace(COLOR, ""))
  if (found?.[1] === undefined || found[2] === undefined) return null
  return { esoSetId, count: Number(found[1]), text: found[2].trim() }
}

export function textShapeOf(text: string): string {
  return text.replace(text.includes(SCALED) ? ANY_NUMBER : PLAIN_NUMBER, "N")
}

function recordOf(value: unknown): Readonly<Record<string, unknown>> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null
}

function entriesOf(value: unknown): readonly unknown[] {
  if (Array.isArray(value)) return value
  const held = recordOf(value)
  return held === null ? [] : Object.values(held)
}

export function setLinesIn(body: string): readonly SetLine[] {
  const found = new Map<string, SetLine>()
  for (const line of body.split("\n")) {
    if (!line.includes("setBonuses")) continue
    const reading = recordOf(recordOf(JSON.parse(line))?.reading)
    for (const piece of entriesOf(reading?.worn)) {
      const worn = recordOf(piece)
      const esoSetId = worn?.setId
      if (typeof esoSetId !== "number") continue
      for (const bonus of entriesOf(worn?.setBonuses)) {
        const description = recordOf(bonus)?.description
        if (typeof description !== "string") continue
        const said = setLineOf(esoSetId, description)
        if (said !== null) found.set(`${String(esoSetId)} ${String(said.count)} ${said.text}`, said)
      }
    }
  }
  return [...found.values()]
}

export function disagreeingLines(
  seen: readonly SetLine[],
  catalog: readonly CatalogSet[]
): readonly SetLine[] {
  const bySet = new Map(catalog.map((set) => [set.esoSetId, set.lines]))
  return seen.filter((one) => {
    const shape = textShapeOf(one.text)
    const lines = bySet.get(one.esoSetId) ?? []
    return !lines.some(
      (line) => line.count === one.count && textShapeOf(line.description) === shape
    )
  })
}
