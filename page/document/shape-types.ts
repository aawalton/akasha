import type { HeadingLevel, Mark, Repo } from "./types.ts"

export type Cardinality = { least: number; max: number }

export type Ceiling = number & { readonly ceiling: unique symbol }

export type ValueType =
  | { type: "slug" }
  | { type: "text"; maxChars: Ceiling }
  | { type: "pattern"; pattern: RegExp; backstop: number }
  | { type: "enum"; values: readonly string[] }
  | { type: "date" }
  | { type: "glob"; repo: Repo }
  | { type: "docref"; to: DocumentRef }
  | { type: "list"; of: ValueType; cardinality: Cardinality }
  | { type: "union"; of: readonly ValueType[] }

export type DocumentRef = { resolve: "path" }

export type LeadRule = { mark: Mark; text: string }

export type MarkRule = { every: Mark } | { without: Mark }

export type TemplateSlot =
  | { slot: "literal"; text: string; optional: boolean }
  | { slot: "hole"; name: string; value: ValueType; mark: Mark | null; optional: boolean }

type ContentBase = {
  marks: MarkRule | null
  lead: LeadRule | null
}

export type ContentRule =
  | (ContentBase & { maxChars: Ceiling; template: readonly TemplateSlot[] | null })
  | (ContentBase & { maxChars: "slots"; template: readonly [TemplateSlot, ...TemplateSlot[]] })

export type HeadingMatch =
  | { match: "literal"; text: string }
  | { match: "any"; content: ContentRule }

export type PartDef = KeyPart | SectionPart | BlockPart | RefPart

export type KeyPart = {
  part: "key"
  name: string
  cardinality: Cardinality
  value: ValueType
}

type SectionBase = {
  part: "section"
  level: HeadingLevel
  heading: HeadingMatch
  cardinality: Cardinality
}

export type SectionPart =
  | (SectionBase & { maxChars: Ceiling; contains: readonly PartDef[] })
  | (SectionBase & { maxChars: "contents"; contains: readonly [PartDef, ...PartDef[]] })

export type BlockPart = ProsePart | ListPart

export type ProsePart = {
  part: "block"
  block: "paragraph"
  cardinality: Cardinality
  content: ContentRule
}

type ListBase = {
  part: "block"
  block: "list"
  ordered: boolean
  cardinality: Cardinality
  items: Cardinality
  item: readonly ContentRule[]
}

export type ListPart =
  | (ListBase & { children: Cardinality; child: readonly ContentRule[] })
  | (ListBase & { children: null })

export type RefPart = { part: "ref"; fragment: string }

export type Fragment = { name: string; parts: readonly PartDef[] }

export type Choice = { cardinality: Cardinality; of: readonly [PartDef, PartDef, ...PartDef[]] }

export type CompiledShape = {
  domain: string
  extends: readonly string[]
  regions: readonly { repo: Repo; glob: string }[]
  frontmatter: readonly KeyPart[]
  sections: readonly PartDef[]
  choices?: readonly Choice[]
  fragments: Readonly<Record<string, Fragment>>
}
