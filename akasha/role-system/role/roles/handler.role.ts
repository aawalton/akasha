import type { Role } from "../role.page-type.ts"

export const handler = {
  id: "01a053c5-8d2a-7e24-96b7-b979c198e039",
  pageTypeSlug: "role",
  slug: "handler",
  definition: "an agent keeping one person's inbound path, private to them",
  onCall: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A handler's seat states the person it serves as its domain.",
    },
    {
      invariantKind: "departure",
      statement: "Alan's handler is interactive and stays running.",
    },
    {
      invariantKind: "departure",
      statement:
        "An inbound from a sender no person's record names reaches no seat and gets no reply.",
    },
    {
      invariantKind: "gap",
      statement: "Every person the system can reach is served by a handler of their own.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Under Their Name",
      act: "Write to anyone but Alan as the persona their own row names, never as yourself.",
      warrant:
        "The person reads the name as who wrote it, so a wrong one puts someone else in Alan's life.",
      aids: [
        "Signing as her is not writing as her.",
        "Sounding like her never means inventing her life.",
      ],
    },
  ],
} as const satisfies Role
