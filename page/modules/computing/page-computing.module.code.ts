import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type {
  Filed,
  Reach,
  Work,
} from "akasha/page/computed-property/computed-property.page-type.ts"

export type Held = Record<string, unknown>

export type Reaches = {
  readonly slug: string
  readonly kinds: ReadonlySet<string>
}

export type Computed = {
  readonly slug: string
  readonly key: string
  readonly holds: string
  readonly reaches?: Reaches
  readonly askedByName?: boolean
  readonly work: Work<Held, unknown>
}

export type Subject = {
  readonly id: string
  readonly value: Held
  readonly computed: readonly Computed[]
}

export type Named = {
  readonly slug: string
  readonly subject: Subject
}

export type Source = {
  readonly subjectAt: (slug: string) => Subject | null
  readonly namingAt?: (id: string, propertySlug: string) => readonly Named[]
  readonly fileAt?: (path: string) => Filed | null
  readonly folderAt?: (path: string) => readonly string[] | null
}

export type Naming = {
  readonly named: string
  readonly under: string
}

export type Reading = {
  readonly pages: readonly string[]
  readonly namings: readonly Naming[]
  readonly files: readonly string[]
  readonly folders: readonly string[]
}

export type Working = {
  readonly value: Held
  readonly dark: ReadonlyMap<string, string>
  readonly read: ReadonlyMap<string, Reading>
}

type Heard = {
  readonly pages: Set<string>
  readonly namings: Map<string, Naming>
  readonly files: Set<string>
  readonly folders: Set<string>
}

export type Computing = {
  readonly workedAt: (slug: string) => Working | null
}

type Answer = { readonly held: unknown } | { readonly fault: string }

const JUDGED: Readonly<Record<string, (held: unknown) => boolean>> = {
  boolean: (held) => typeof held === "boolean",
  date: (held) => typeof held === "string" && /^\d{4}-\d{2}-\d{2}$/.test(held),
  instant: (held) => typeof held === "string" && !Number.isNaN(Date.parse(held)),
  number: (held) => typeof held === "number" && Number.isFinite(held),
  records: (held) =>
    Array.isArray(held) &&
    held.every((one) => typeof one === "object" && one !== null && !Array.isArray(one)),
  relation: (held) => typeof held === "string",
  text: (held) => typeof held === "string",
}

const KINDS: readonly string[] = Object.keys(JUDGED).sort()

const RELATION = "relation"

const SLASH = "/"

function shapeFault(one: Computed): string | null {
  if (one.holds === RELATION && one.reaches === undefined) {
    return `\`${one.slug}\` states it holds a relation, and names no page type that relation reaches`
  }
  if (one.holds !== RELATION && one.reaches !== undefined) {
    return `\`${one.slug}\` names \`${one.reaches.slug}\` as the page type it reaches, and states it holds ${one.holds} rather than a relation`
  }
  return null
}

function nameOf(held: unknown): string {
  if (held === null) return "nothing"
  if (Array.isArray(held)) return "a list"
  if (typeof held === "number" && !Number.isFinite(held)) return "a number that is not finite"
  return typeof held
}

function presentIn(value: Held): Held {
  const held: Held = {}
  for (const [key, one] of Object.entries(value)) {
    if (typeof one === "number" && !Number.isFinite(one)) continue
    held[key] = one
  }
  return held
}

function readingOf(one: Heard | undefined): Reading {
  if (one === undefined) return { pages: [], namings: [], files: [], folders: [] }
  return {
    pages: [...one.pages].sort(),
    namings: [...one.namings.values()],
    files: [...one.files].sort(),
    folders: [...one.folders].sort(),
  }
}

export function computingOver(source: Source): Computing {
  const answers = new Map<string, Answer>()
  const views = new Map<string, Held>()
  const settled = new Map<string, Working>()
  const frames: string[] = []
  const walking: Subject[] = []
  const heard = new Map<string, Heard>()

  const heardAt = (frame: string): Heard => {
    const already = heard.get(frame)
    if (already !== undefined) return already
    const fresh: Heard = {
      pages: new Set(),
      namings: new Map(),
      files: new Set(),
      folders: new Set(),
    }
    heard.set(frame, fresh)
    return fresh
  }

  const hearing = (): Heard | null => {
    const frame = frames[frames.length - 1]
    return frame === undefined ? null : heardAt(frame)
  }

  const carried = (frame: string): undefined => {
    const into = hearing()
    const from = heard.get(frame)
    if (into === null || from === undefined || into === from) return undefined
    for (const one of from.pages) into.pages.add(one)
    for (const [key, one] of from.namings) into.namings.set(key, one)
    for (const one of from.files) into.files.add(one)
    for (const one of from.folders) into.folders.add(one)
    return undefined
  }

  const namingFault = (one: Computed, held: string): string | null => {
    const reaches = one.reaches
    if (reaches === undefined) return null
    const said = `\`${one.slug}\` states it holds a relation to \`${reaches.slug}\`, and its calculation answered \`${held}\``
    const cut = held.indexOf(SLASH)
    if (cut <= 0 || cut === held.length - 1) return `${said}, which is no page's address`
    if (!reaches.kinds.has(held.slice(0, cut))) return `${said}, which is no page of that type`
    if (source.subjectAt(held) === null) return `${said}, which names no page`
    return null
  }

  const heldBy = (subject: Subject, one: Computed, view: Held): unknown => {
    const frame = `${subject.id}#${one.slug}`
    const already = answers.get(frame)
    if (already !== undefined) {
      carried(frame)
      if ("fault" in already) throw new Error(already.fault)
      return already.held
    }
    const from = frames.indexOf(frame)
    if (from !== -1) {
      const round = [...frames.slice(from), frame].join(" then ")
      throw new Error(`a chain of reads comes back to where that chain started: ${round}`)
    }
    frames.push(frame)
    walking.push(subject)
    heardAt(frame)
    try {
      const shaped = shapeFault(one)
      if (shaped !== null) throw new Error(shaped)
      const answered = one.work(view, reach)
      const judge = JUDGED[one.holds]
      if (judge === undefined) {
        throw new Error(
          `\`${one.slug}\` states it holds \`${one.holds}\`, and the kinds a calculation answers are ${KINDS.join(", ")}`
        )
      }
      if (answered === null || answered === undefined) {
        answers.set(frame, { held: undefined })
        return undefined
      }
      if (!judge(answered)) {
        throw new Error(
          `\`${one.slug}\` states it holds ${one.holds}, and its calculation answered ${nameOf(answered)}`
        )
      }
      const named = typeof answered === "string" ? namingFault(one, answered) : null
      if (named !== null) throw new Error(named)
      answers.set(frame, { held: answered })
      return answered
    } catch (thrown) {
      const fault = saidBy(thrown)
      answers.set(frame, { fault })
      throw thrown instanceof Error ? thrown : new Error(fault)
    } finally {
      walking.pop()
      frames.pop()
      carried(frame)
    }
  }

  const viewOf = (subject: Subject): Held => {
    const already = views.get(subject.id)
    if (already !== undefined) return already
    const view: Held = presentIn(subject.value)
    for (const one of subject.computed) {
      Object.defineProperty(view, one.key, {
        enumerable: true,
        configurable: true,
        get: () => heldBy(subject, one, view),
      })
    }
    views.set(subject.id, view)
    return view
  }

  const reach: Reach = {
    target: <Found>(slug: string): Found | null => {
      hearing()?.pages.add(slug)
      const subject = source.subjectAt(slug)
      if (subject === null) return null
      return viewOf(subject) as Found
    },
    through: <Found>(relationKey: string, key: string): Found | null => {
      const here = walking[walking.length - 1]
      if (here === undefined) return null
      const said = viewOf(here)[relationKey]
      if (typeof said !== "string" || said === "") return null
      const found = reach.target<Held>(said)?.[key]
      return found === undefined || found === null ? null : (found as Found)
    },
    naming: <Found>(propertySlug: string): readonly Found[] => {
      const here = walking[walking.length - 1]
      if (here === undefined) return []
      const into = hearing()
      into?.namings.set(`${here.id}#${propertySlug}`, { named: here.id, under: propertySlug })
      const namingAt = source.namingAt
      if (namingAt === undefined) return []
      return namingAt(here.id, propertySlug).map((one) => {
        into?.pages.add(one.slug)
        return viewOf(one.subject) as Found
      })
    },
    file: (path: string): Filed | null => {
      hearing()?.files.add(path)
      return source.fileAt?.(path) ?? null
    },
    folder: (path: string): readonly string[] | null => {
      hearing()?.folders.add(path)
      return source.folderAt?.(path) ?? null
    },
  }

  const workedAt = (slug: string): Working | null => {
    const already = settled.get(slug)
    if (already !== undefined) return already
    const subject = source.subjectAt(slug)
    if (subject === null) return null
    const view = viewOf(subject)
    const value: Held = { ...subject.value }
    const dark = new Map<string, string>()
    const read = new Map<string, Reading>()
    for (const one of subject.computed) {
      try {
        const held = view[one.key]
        if (held !== undefined) value[one.key] = held
      } catch (thrown) {
        dark.set(one.key, saidBy(thrown))
      }
      read.set(one.key, readingOf(heard.get(`${subject.id}#${one.slug}`)))
    }
    const working: Working = { value, dark, read }
    settled.set(slug, working)
    return working
  }

  return { workedAt }
}
