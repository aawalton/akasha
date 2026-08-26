import { bullets, sectionNamed } from "../markdown/markdown.ts"

const DEFINITION = "Definition"

const BULLET = /^- \*\*(.+?)\*\* — (.+)$/

export interface Definition {
  readonly term: string
  readonly definition: string
}

export function definitionOf(body: string): Definition | null {
  const section = sectionNamed(body, DEFINITION)
  const first = section === null ? undefined : bullets(section.body)[0]?.text
  const found = first === undefined ? null : BULLET.exec(first.trim())
  const term = found?.[1]
  const definition = found?.[2]
  return term === undefined || definition === undefined ? null : { term, definition }
}
