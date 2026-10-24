import { LIVE_MODEL } from "akasha/agent/seat/voice/modules/setup/seat-voice-setup.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { absence } from "akasha/domain/decision-kind/pages/absence.decision-kind.ts"
import { constraint } from "akasha/domain/decision-kind/pages/constraint.decision-kind.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  objectIn,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const KEPT_KINDS: ReadonlySet<string> = new Set([constraint.slug, absence.slug])

const NOT_ON_A_CALL: ReadonlySet<string> = new Set(["Start The Recorder"])

const CALL: readonly string[] = [
  "This is a phone call. Alan and Jenny are each on their own phone, and you hear both of them mixed together.",
  "The phone system adds lines in square brackets, such as [Jenny is speaking] or [Alan has joined the call]. Nobody says them aloud and you never read them out; they tell you who is talking. Where you cannot tell who said something, ask.",
  "Speak as a therapist speaks on the phone: warm and unhurried, a few sentences a turn. When Alan and Jenny talk to each other, let them, and come in when one of them speaks to you or when they need you.",
  "Until both of them are on the call, greet whoever is there and wait with them.",
  "If either of them speaks of harming themselves or anyone else, set the session aside, say so plainly, and urge them to call 911, or 988 for the crisis line.",
]

type Directive = {
  readonly name: string
  readonly act: string
  readonly warrant: string
  readonly aids: readonly string[]
}

type Settled = { readonly title: string; readonly settled: string }

export type TherapistPages = {
  readonly definition: string | null
  readonly purpose: string | null
  readonly voice: string | null
  readonly decisions: readonly string[]
  readonly directives: readonly Directive[]
  readonly settled: readonly Settled[]
}

type Refused = { readonly refused: string }

type Row = Readonly<Record<string, unknown>>

const NONE: readonly unknown[] = []

function textsOf(value: unknown): readonly string[] {
  return (Array.isArray(value) ? value : NONE).flatMap((one) => {
    const said = textIn(one)
    return said === null ? [] : [said]
  })
}

export function decisionsIn(value: unknown): readonly string[] {
  return (Array.isArray(value) ? value : NONE).flatMap((one) => {
    const decision = objectIn(one)
    const kind = textIn(decision?.decisionKind)
    const statement = textIn(decision?.statement)
    return kind !== null && statement !== null && KEPT_KINDS.has(slugOf(kind)) ? [statement] : []
  })
}

export function directivesIn(value: unknown): readonly Directive[] {
  return (Array.isArray(value) ? value : NONE).flatMap((one) => {
    const directive = objectIn(one)
    const name = textIn(directive?.name)
    const act = textIn(directive?.act)
    const warrant = textIn(directive?.warrant)
    if (name === null || act === null || warrant === null || NOT_ON_A_CALL.has(name)) return []
    return [{ name, act, warrant, aids: textsOf(directive?.aids) }]
  })
}

export function briefFor(pages: TherapistPages): string {
  const who = [
    `You are Claudius${pages.definition === null ? "" : `, ${pages.definition}`}.`,
    pages.purpose ?? "",
  ]
  const holds = pages.decisions.map((statement) => `- ${statement}`)
  const works = pages.directives.map((one) =>
    [`- ${one.name}: ${one.act} ${one.warrant}`, ...one.aids.map((aid) => `  - ${aid}`)].join("\n")
  )
  const settled =
    pages.settled.length === 0
      ? ["Nothing is settled yet; this is one of their first sessions."]
      : pages.settled.map((one) => `## ${one.title}\n${one.settled}`)
  return [
    who.filter((line) => line !== "").join(" "),
    CALL.join("\n\n"),
    ["What is true of Alan, Jenny and this practice:", ...holds].join("\n"),
    ["How you work:", ...works].join("\n"),
    ["What Alan and Jenny have settled in earlier sessions:", ...settled].join("\n\n"),
  ].join("\n\n")
}

export function setupFor(pages: TherapistPages): Row {
  return {
    model: LIVE_MODEL,
    generationConfig: {
      responseModalities: ["AUDIO"],
      ...(pages.voice === null
        ? {}
        : { speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: pages.voice } } } }),
    },
    systemInstruction: { parts: [{ text: briefFor(pages) }] },
    sessionResumption: {},
    contextWindowCompression: { slidingWindow: {} },
  }
}

type Found = { readonly row: Row } | Refused

function firstRow(asked: { readonly rows: readonly Row[] } | Refused): Found {
  if ("refused" in asked) return asked
  const row = asked.rows[0]
  return row === undefined ? { refused: "a page the therapist is told was not found" } : { row }
}

function oneNamed(pageTypeSlug: string, slug: string, keys: readonly string[]): Promise<Found> {
  return askingFor({ pageTypeSlug, where: { slug: { is: slug } }, keys, limit: 1 }).then(firstRow)
}

export async function therapistPages(): Promise<TherapistPages | Refused> {
  const [domainFound, roleFound, personaFound, topics] = await Promise.all([
    oneNamed("domain", "couples-therapy", ["decisions", "directives"]),
    oneNamed("role", "couples-therapist", ["directives"]),
    oneNamed("persona", "claudius", ["definition", "purpose", "liveVoice"]),
    askingFor({ pageTypeSlug: "alan-and-jenny-topic", keys: ["title", "settled"] }),
  ])
  if ("refused" in domainFound) return domainFound
  if ("refused" in roleFound) return roleFound
  if ("refused" in personaFound) return personaFound
  if ("refused" in topics) return topics
  const domain = domainFound.row
  const role = roleFound.row
  const persona = personaFound.row
  return {
    definition: textIn(persona.definition),
    purpose: textIn(persona.purpose),
    voice: textIn(persona.liveVoice),
    decisions: decisionsIn(domain.decisions),
    directives: [...directivesIn(domain.directives), ...directivesIn(role.directives)],
    settled: topics.rows.flatMap((row) => {
      const title = textIn(row.title)
      const settled = textIn(row.settled)
      return title === null || settled === null ? [] : [{ title, settled }]
    }),
  }
}
