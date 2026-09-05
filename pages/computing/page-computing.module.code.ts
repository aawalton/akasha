export type Held = Record<string, unknown>

export type Reach = {
  readonly target: <Found>(slug: string) => Found | null
}

export type Work<Page, Found> = (page: Page, reach: Reach) => Found | null

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

export type Source = {
  readonly subjectAt: (slug: string) => Subject | null
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

export function computingOver(source: Source): Computing {
  const answers = new Map<string, Answer>()
  const views = new Map<string, Held>()
  const settled = new Map<string, Working>()
  const frames: string[] = []

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
      frames.pop()
    }
  }

  const viewOf = (slug: string, subject: Subject): Held => {
    const already = views.get(slug)
    if (already !== undefined) return already
    const view: Held = { ...subject.value }
    for (const one of subject.computed) {
      Object.defineProperty(view, one.key, {
        enumerable: true,
        configurable: true,
        get: () => heldBy(subject, one, view),
      })
    }
    views.set(slug, view)
    return view
  }

  const reach: Reach = {
    target: <Found>(slug: string): Found | null => {
      const subject = source.subjectAt(slug)
      if (subject === null) return null
      return viewOf(slug, subject) as Found
    },
  }

  const workedAt = (slug: string): Working | null => {
    const already = settled.get(slug)
    if (already !== undefined) return already
    const subject = source.subjectAt(slug)
    if (subject === null) return null
    const view = viewOf(slug, subject)
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
