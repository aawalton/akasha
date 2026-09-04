import type {
  Document,
  FrontmatterValue,
  Inline,
  ListItem,
  Section,
  Span,
} from "@akasha/pages-system/markdown-document"

export const HOLES_KEY = "holes"

export const HOLE = /\{([^{}]*)\}/g

export type HoleFault = { span: Span; part: string; expected: string; measured: string }

type Found = { name: string; span: Span }

function marked(xs: readonly Inline[]): Found[] {
  const out: Found[] = []
  for (const x of xs) for (const m of x.text.matchAll(HOLE)) out.push({ name: m[1]!, span: x.span })
  return out
}

const inItem = (it: ListItem): Found[] => [...marked(it.content), ...it.children.flatMap(inItem)]

const inSection = (s: Section): Found[] => [
  ...marked(s.heading),
  ...s.blocks.flatMap((b) =>
    b.kind === "paragraph" ? marked(b.content) : b.kind === "list" ? b.items.flatMap(inItem) : []
  ),
  ...s.sections.flatMap(inSection),
]

const namesIn = (v: FrontmatterValue): string[] =>
  v.kind === "scalar" ? [v.value.text] : v.kind === "list" ? v.items.flatMap(namesIn) : []

export function holeFaults(doc: Document): HoleFault[] {
  const key = doc.frontmatter.find((k) => k.name === HOLES_KEY)
  if (key === undefined) return []
  const declared = namesIn(key.value)
  const found = doc.sections.flatMap(inSection)
  const undeclared = found
    .filter((f) => !declared.includes(f.name))
    .map((f) => ({
      span: f.span,
      part: `the hole \`{${f.name}}\``,
      expected: `one of \`${HOLES_KEY}:\``,
      measured: "a name it does not carry",
    }))
  const unmarked = declared
    .filter((name) => !found.some((f) => f.name === name))
    .map((name) => ({
      span: key.span,
      part: `the hole \`{${name}}\``,
      expected: "marked in the body",
      measured: "nothing",
    }))
  return [...undeclared, ...unmarked]
}
