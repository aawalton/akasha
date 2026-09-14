import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const emailRouting = {
  id: "01a0a134-8b3b-73ff-8e4a-6023f834c680",
  type: "domain",
  slug: "email-routing",
  definition: "the rules a mail provider carries for the addresses personas are written to",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here takes a routing rule away or turns one off.",
    },
    {
      invariantKind: "departure",
      statement: "An address some rule already routes is left alone, whatever that rule is named.",
    },
    {
      invariantKind: "departure",
      statement: "A rule routing an address no persona declares is named rather than changed.",
    },
    {
      invariantKind: "departure",
      statement: "The address mail is forwarded on to is read back from the provider.",
    },
    {
      invariantKind: "absence",
      statement: "No page here states the address mail is forwarded on to.",
    },
    {
      invariantKind: "departure",
      statement: "The addresses to route are read off the persona pages and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A run over a zone nothing has changed writes nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "Cloudflare answers some refusals with a 200 carrying `success: false`.",
    },
    {
      invariantKind: "departure",
      statement: "A token refused the write says so rather than being tried again.",
    },
  ],
} as const satisfies Domain
