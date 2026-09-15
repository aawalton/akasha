import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailRouting = {
  id: "01a0a134-8b3b-73ff-8e4a-6023f834c680",
  type: "domain",
  slug: "email-routing",
  definition: "the rules a mail provider carries for the addresses personas are written to",
  parts: [
    "module/email-rule-planning",
    "module/email-zone-reaching",
    "module/persona-routing-run",
    "service-workstation/persona-email-routing",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a routing rule away or turns one off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address some rule already routes is left alone, whatever that rule is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule routing an address no persona declares is named rather than changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The address mail is forwarded on to is read back from the provider.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page here states the address mail is forwarded on to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The addresses to route are read off the persona pages and nowhere else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run over a zone nothing has changed writes nothing.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Cloudflare answers some refusals with a 200 carrying `success: false`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token refused the write says so rather than being tried again.",
    },
  ],
} as const satisfies Domain
