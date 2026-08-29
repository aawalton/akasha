import { createRequire } from "node:module"
import { resolve } from "node:path"
import type { Corpus } from "../write-system/corpus.module.code.ts"
import { corpusIn } from "../write-system/corpus.module.code.ts"
import type { BodyStore, Record_ } from "../write-system/reading.module.code.ts"
import { bodiesAt, recordAt } from "../write-system/reading.module.code.ts"

export type Outside = {
  readonly root: string
  readonly seat: string | null
  readonly record: string
  readonly bodies: string
  readonly index: string
  readonly discardedTo: string | null
  readonly calledAs: string
  readonly from: string
}

export type Answer = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

export type Given = {
  readonly root: string
  readonly corpus: Corpus
  readonly record: Record_
  readonly bodies: BodyStore
  readonly index: string
  readonly writer: string | null
  readonly discardedTo: string | null
  readonly calledAs: string
  readonly from: string
}

export type Answering = (argv: readonly string[], given: Given) => Answer

const COMMAND = "command"

const reach_ = createRequire(import.meta.url)

function camel(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, one: string) => one.toUpperCase())
}

export function commandsIn(corpus: Corpus): readonly string[] {
  const found: string[] = []
  for (const one of corpus.every()) {
    if (corpus.admits(one.pageTypeSlug, COMMAND)) found.push(one.slug)
  }
  return found.sort()
}

export function codeBeside(path: string, slug: string): string {
  return `${path.slice(0, path.lastIndexOf("/"))}/${slug}.command.code.ts`
}

function answeringIn(at: string, slug: string): Answering | null {
  let mod: Record<string, unknown>
  try {
    mod = reach_(at) as Record<string, unknown>
  } catch {
    return null
  }
  const named = mod[camel(slug)]
  if (typeof named === "function") return named as Answering
  const every = Object.values(mod).filter((one) => typeof one === "function")
  return every.length === 1 && every[0] !== undefined ? (every[0] as Answering) : null
}

function listed(every: readonly string[], calledAs: string): string {
  return every.map((one) => `  ${calledAs} ${one}`).join("\n")
}

function refusing(said: string): Answer {
  return { report: [], refusals: [said], code: 1 }
}

export function calling(argv: readonly string[], outside: Outside): Answer {
  const root = resolve(outside.root)
  const corpus = corpusIn(root)
  const every = commandsIn(corpus)
  const named = argv[0]
  if (named === undefined) {
    return refusing(
      `${outside.calledAs} takes a command, and none was named. These are the commands it carries:\n${listed(every, outside.calledAs)}`
    )
  }
  const what = corpus.resolve(named, COMMAND)
  if (what.kind === "none") {
    return refusing(
      `\`${named}\` is no command akasha carries. These are the commands it carries:\n${listed(every, outside.calledAs)}`
    )
  }
  if (what.kind === "many") {
    const among = what.among.map((one) => `  ${one.path.slice(root.length + 1)}`).join("\n")
    return refusing(
      `\`${named}\` is carried by ${what.among.length} commands, so this names more than one:\n${among}`
    )
  }
  const at = codeBeside(what.at.path, named)
  const answering = answeringIn(at, named)
  if (answering === null) {
    return refusing(
      `\`${named}\` is a page, and ${at.slice(root.length + 1)} answers to nothing that can be called`
    )
  }
  return answering(argv.slice(1), {
    root,
    corpus,
    record: recordAt(outside.record),
    bodies: bodiesAt(outside.bodies),
    index: outside.index,
    writer: outside.seat,
    discardedTo: outside.discardedTo,
    calledAs: `${outside.calledAs} ${named}`,
    from: outside.from,
  })
}
