import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const agentHarness = {
  id: "01a06588-ed4e-7908-8027-221aae7b6cab",
  pageTypeSlug: "domain",
  slug: "agent-harness",
  definition: "how agents do things",
  partSlugs: [
    "domain/claude-code",
    "domain/message-warrant-announce",
    "domain/message-warrant-blocked",
    "module/account-upkeep-running",
    "module/account-upkeep-stall-reading",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One path writes a seat's client configuration.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which command launched a seat does not change the path writing that configuration.",
    },
    {
      invariantKind: "departure",
      statement:
        "An agent works at a terminal or at a seat with no terminal or inside another agent's turn.",
    },
    {
      invariantKind: "departure",
      statement: "An agent another agent handed work to is that agent's delegate.",
    },
    {
      invariantKind: "departure",
      statement: "Sending a seat to a piece of work is a dispatch.",
    },
    {
      invariantKind: "departure",
      statement:
        "An interview session is one live conversation and the seat running that conversation.",
    },
    {
      invariantKind: "departure",
      statement: "An interview session holds one seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "What lands a change under an interview session is a subagent rather than a second seat.",
    },
    {
      invariantKind: "departure",
      statement: "Changes land continuously through an interview session rather than at the end.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every act an agent leaves for later has a reminder set for that act.",
    },
    {
      invariantKind: "upkeep",
      statement:
        "Every figure an agent holds as true was taken after the last change to what the figure measures.",
    },
    {
      invariantKind: "gap",
      statement:
        "What a row means is settled by the harness rather than by the code writing the row.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Fast Correction",
      act: "Buy the harness's reliability by fixing real cases fast, not by adding gates ahead of them.",
      warrant:
        "A change here reaches every seat on the commit, so a fault is cheap to fix; a gate is paid forever.",
      aids: [
        "Never answer a fault you fixed with a new gate.",
        "Never hold a fix back to design a better one.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Single Authority",
      act: "Bind each claim from exactly one document.",
      warrant:
        "Where two documents bind one claim, their disagreement is a contradiction nothing can settle.",
      aids: [
        "Never summarise a claim another document binds.",
        "Delete the old line when you move a claim.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Headroom",
      act: "Never report that a part is close to its bound as a defect, in your own words or in an instrument's.",
      warrant:
        "A bound makes the next write push something out, so a part just under one is the bound working.",
      aids: [
        "Say how close a part is to a bound only if asked.",
        "Never propose raising a bound a part came near.",
      ],
    },
  ],
} as const satisfies Domain
