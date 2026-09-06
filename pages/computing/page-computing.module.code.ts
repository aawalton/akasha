// THE REACH AND THE CALCULATION ARE DECLARED BY THE PROPERTY RATHER THAN HERE. A calculation is
// typed against the property's declaration and the engine against its own, so two declarations of
// one shape drift apart with nothing to catch the drift: adding a key to one leaves every
// calculation typed against the other.
import type { Reach, Work } from "../computed-properties/computed-property.page-type.ts"

export type { Reach, Work }

export type Held = Record<string, unknown>

export type Computed = {
  readonly slug: string
  readonly key: string
  readonly holds: string
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

// A SOURCE ANSWERING NO NAMINGS REACHES NO PAGE THROUGH A RELATION. Which pages name a page is read
// from an index, which a source built from a list of pages alone cannot consult, so a source says
// here whether it can answer rather than every source being taken to.
export type Source = {
  readonly subjectAt: (slug: string) => Subject | null
  readonly namingAt?: (id: string, propertySlug: string) => readonly Named[]
}

export type Working = {
  readonly value: Held
  readonly dark: ReadonlyMap<string, string>
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
  text: (held) => typeof held === "string",
}

export const KINDS: readonly string[] = Object.keys(JUDGED).sort()

function nameOf(held: unknown): string {
  if (held === null) return "nothing"
  if (Array.isArray(held)) return "a list"
  return typeof held
}

function faultIn(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

// A number that is not finite is no reading akasha keeps: a query narrows one away, and
// `JUDGED.number` above refuses a calculation that answers one.
// So one a page carries is left off the page a calculation is handed, and the calculation
// meets absent where it would otherwise meet Infinity or NaN.
function presentIn(value: Held): Held {
  const held: Held = {}
  for (const [key, one] of Object.entries(value)) {
    if (typeof one === "number" && !Number.isFinite(one)) continue
    held[key] = one
  }
  return held
}

export function computingOver(source: Source): Computing {
  const answers = new Map<string, Answer>()
  const views = new Map<string, Held>()
  const settled = new Map<string, Working>()
  const frames: string[] = []
  const walking: Subject[] = []

  const heldBy = (subject: Subject, one: Computed, view: Held): unknown => {
    const frame = `${subject.id}#${one.slug}`
    const already = answers.get(frame)
    if (already !== undefined) {
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
    try {
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
      answers.set(frame, { held: answered })
      return answered
    } catch (thrown) {
      const fault = faultIn(thrown)
      answers.set(frame, { fault })
      throw thrown instanceof Error ? thrown : new Error(fault)
    } finally {
      walking.pop()
      frames.pop()
    }
  }

  // KEYED BY THE PAGE'S OWN ID RATHER THAN BY THE NAME THE PAGE WAS REACHED UNDER. One page is
  // reached by its path, by its slug and as a page naming another, and a view worked under one of
  // those names is the same view under the rest.
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
      const subject = source.subjectAt(slug)
      if (subject === null) return null
      return viewOf(subject) as Found
    },
    naming: <Found>(propertySlug: string): readonly Found[] => {
      const here = walking[walking.length - 1]
      if (here === undefined) return []
      const namingAt = source.namingAt
      if (namingAt === undefined) return []
      return namingAt(here.id, propertySlug).map((one) => viewOf(one.subject) as Found)
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
    for (const one of subject.computed) {
      try {
        const held = view[one.key]
        if (held !== undefined) value[one.key] = held
      } catch (thrown) {
        dark.set(one.key, faultIn(thrown))
      }
    }
    const working: Working = { value, dark }
    settled.set(slug, working)
    return working
  }

  return { workedAt }
}
