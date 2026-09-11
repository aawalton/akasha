import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const auditServing = {
  id: "01a091e9-689c-7001-a9f4-f25090091be1",
  type: "module",
  slug: "audit-serving",
  definition: "one check's audit run under a turn of its own, and the round running them all",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit of work is one check's audit rather than a whole audit run.",
    },
    {
      invariantKind: "departure",
      statement: "A turn is taken for each check rather than one turn for the service.",
    },
    {
      invariantKind: "departure",
      statement: "Two audits of one check never overlap.",
    },
    {
      invariantKind: "departure",
      statement: "Two audits of two checks may overlap.",
    },
    {
      invariantKind: "departure",
      statement: "A second asker inside one process waits on the first asker's answer.",
    },
    {
      invariantKind: "departure",
      statement: "A turn is waited on by a wait that holds the loop, so two in one process hang.",
    },
    {
      invariantKind: "departure",
      statement: "Askers share an answer only where check, home and commit all agree.",
    },
    {
      invariantKind: "departure",
      statement: "An asker whose check is clean at the asker's commit starts no run.",
    },
    {
      invariantKind: "departure",
      statement: "The verdict is read again once the turn is taken.",
    },
    {
      invariantKind: "departure",
      statement: "Many askers at one commit are answered by one run.",
    },
    {
      invariantKind: "departure",
      statement: "The commit a run answers for is read before the tree is walked.",
    },
    {
      invariantKind: "departure",
      statement: "The tree is walked once for a round rather than once for each check.",
    },
    {
      invariantKind: "departure",
      statement: "A round asks at the commit the round opened at, so every check in it runs.",
    },
    {
      invariantKind: "departure",
      statement: "A check that refused and a check that threw are told apart in the verdict.",
    },
    {
      invariantKind: "departure",
      statement: "thea is told of a check that turned from clean to refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A check refusing the round before is told again to nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A check turning clean again is told to nobody.",
    },
    {
      invariantKind: "departure",
      statement: "One message carries every check that turned in a round.",
    },
    {
      invariantKind: "departure",
      statement: "A telling that lands nowhere ends the round as broken.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose environment names no home is refused before any check runs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks for an audit on another agent's behalf.",
    },

    {
      invariantKind: "departure",
      statement: "A check whose input never moved since its verdict is carried rather than run.",
    },
    {
      invariantKind: "departure",
      statement: "A carried verdict keeps the moment it ran and takes the newer commit.",
    },
    {
      invariantKind: "departure",
      statement: "The files moved between two commits are asked of git.",
    },
    {
      invariantKind: "departure",
      statement: "A span is asked of git once however many checks ask for that span.",
    },
    {
      invariantKind: "departure",
      statement: "A check naming no input is run rather than carried.",
    },
    {
      invariantKind: "departure",
      statement: "A span git could not answer is run rather than carried.",
    },
    {
      invariantKind: "departure",
      statement: "An asker handing over no span carries nothing forward.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict that refused is carried forward as a verdict that refuses.",
    },
  ],
} as const satisfies Module
