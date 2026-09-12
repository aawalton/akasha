export type Position = { line: number; column: number; offset: number }
export type Span = { start: Position; end: Position }

export type Mark = "strong" | "em" | "code"
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export type Repo = string

export type Inline =
  | { kind: "text"; text: string; marks: readonly Mark[]; span: Span }
  | { kind: "link"; text: string; href: string; marks: readonly Mark[]; span: Span }

export type ListItem = {
  content: readonly Inline[]
  children: readonly ListItem[]
  span: Span
}

export type Block =
  | { kind: "paragraph"; content: readonly Inline[]; span: Span }
  | { kind: "list"; ordered: boolean; items: readonly ListItem[]; span: Span }
  | { kind: "fence"; lang: string | null; text: string; span: Span }
  | { kind: "table"; header: Row; rows: readonly Row[]; span: Span }

export type Row = readonly (readonly Inline[])[]

export type Section = {
  level: HeadingLevel
  heading: readonly Inline[]
  blocks: readonly Block[]
  sections: readonly Section[]
  span: Span
}

export type Scalar = { text: string; span: Span }

export type FrontmatterValue =
  | { kind: "scalar"; value: Scalar }
  | { kind: "list"; items: readonly FrontmatterValue[]; span: Span }
  | { kind: "map"; entries: readonly MapEntry[]; span: Span }

export type MapEntry = { key: Scalar; value: FrontmatterValue }

export type FrontmatterKey = { name: string; value: FrontmatterValue; span: Span }

export type Document = {
  path: string
  frontmatter: readonly FrontmatterKey[]
  sections: readonly Section[]
  unreadable: readonly Span[]
  span: Span
}

export type Refusal = {
  path: string
  span: Span
  part: string
  expected: string
  measured: string
}

export type Verdict =
  | { ok: true; path: string; parts: number }
  | { ok: false; path: string; refusals: readonly Refusal[] }
