import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const unitLanding = {
  id: "01a09266-2700-7188-8dc0-348deb34b2d4",
  type: "module",
  slug: "unit-landing",
  definition: "the workstation units kept as their pages state them",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every unit akasha has installed is weighed against the text its page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A unit whose text is already what its page states is left alone and said nothing about.",
    },
    {
      invariantKind: "departure",
      statement: "A unit whose text drifted is written as the page states it.",
    },
    {
      invariantKind: "departure",
      statement: "systemd is told to read the units again where any unit was written.",
    },
    {
      invariantKind: "departure",
      statement:
        "What starts a service, arms a timer and moves the kind's tree is the deploy naming that kind.",
    },
    {
      invariantKind: "departure",
      statement: "A unit whose installed text could not be read is written as its page states it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tree a unit's run is spelled under is the tree the installed units already name.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that refuses is said as wrong rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A reload that refuses leaves the units written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rules on how long a service has been up.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here installs a unit, enables one, or takes one away.",
    },
    {
      invariantKind: "absence",
      statement: "A unit no link of akasha's reaches is weighed by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page that is not a workstation service's.",
    },
    {
      invariantKind: "absence",
      statement: "Which files a service reaches is asked here by nothing at all.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws out of the landing.",
    },
    {
      invariantKind: "gap",
      statement: "A unit's fields are read flat rather than under the section each sits in.",
    },
    {
      invariantKind: "gap",
      statement: "A service a refused systemctl left as it was is put right by `akasha deploy`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a service, arms a timer, or moves a tree.",
    },
    {
      invariantKind: "gap",
      statement:
        "What composes a unit's text sits in no service's deploy closure, so writing it starts no deploy.",
    },
  ],
} as const satisfies Module
