import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type PersonaMessages = "jsonl"

export type PersonaMessageRow = {
  readonly id?: string
  readonly personaSlug?: string
  readonly sent?: number
}

export type WorkedPersonaMessages = readonly PersonaMessageRow[]

export const personaMessages = {
  id: "01a082db-b831-7808-98c8-82c83e7528b6",
  pageTypeSlug: "page-property-entry",
  slug: "persona-messages",
  propertySlug: "persona-messages",
  definition: "how many messages each persona was written on a day, one to a line",
  properties: [
    { pagePropertySlug: "relation-property/messaged-persona-slug", required: true, many: false },
    { pagePropertySlug: "number-property/messages-sent", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One persona has one row on a day.",
    },
    {
      invariantKind: "departure",
      statement: "A row's count rises as the day runs rather than a row landing per message.",
    },
    {
      invariantKind: "departure",
      statement: "A persona written to on no day has no row on that day.",
    },
    {
      invariantKind: "departure",
      statement: "These rows stay outside the commit, so they reach no other checkout.",
    },
    {
      invariantKind: "absence",
      statement: "No row says when in the day a message was written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a count into points.",
    },
  ],
} as const satisfies PagePropertyEntry
