import type { Module } from "@akasha/code/module"

export const asking = {
  id: "01a04df0-ecce-7c46-bec3-1461348a7d55",
  pageTypeSlug: "module",
  type: "module",
  slug: "asking",
  definition: "the change a command asks for, gated and landed and answered for",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every command asks for its change through this module.",
    },
    {
      invariantKind: "departure",
      statement: "A change that landed is answered as landed whether or not the report was built.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that threw is answered as operational rather than as unclassified.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run gates without the hold and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A draft runs the checks a landing runs and owes the reading a landing owes.",
    },
    {
      invariantKind: "departure",
      statement: "A warrant refuses a draft as a warrant refuses a landing.",
    },
    {
      invariantKind: "departure",
      statement: "A check refusing says so in the report and the draft is kept either way.",
    },
    {
      invariantKind: "departure",
      statement: "A draft keeps a patch rather than writing a file.",
    },
    {
      invariantKind: "departure",
      statement: "A command that drafts takes no dry run flag.",
    },
    {
      invariantKind: "departure",
      statement: "The patch a draft keeps sits beside the page of the agent that asked.",
    },
    {
      invariantKind: "departure",
      statement: "A caller whose agent has no page is refused rather than drafted nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "That refusal names the hook putting a subagent's page up and the command to put that page up.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the log where a refusal to put that page up was said.",
    },
    {
      invariantKind: "departure",
      statement:
        "The names that refusal gives are filled in from the agent id as far as that id says.",
    },
    {
      invariantKind: "departure",
      statement: "A body drafted is recorded as read by nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch has a conflict at is named in the report as well.",
    },
    {
      invariantKind: "departure",
      statement: "A draft says how many paths the patch would leave were judged.",
    },
    {
      invariantKind: "departure",
      statement: "A draft names each path a check refused with the reason that check gave.",
    },
    {
      invariantKind: "departure",
      statement: "A draft was judged over the patch rather than the call's own paths.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dry run judges the tree as the dry run runs rather than the tree a later landing will judge.",
    },
    {
      invariantKind: "departure",
      statement: "The links a caller hands in are repointed once the checks have loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A gate that would not load is answered before any link is repointed.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A link repointed while this call runs reaches a folder the change has not written yet.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change with a package manifest installs the checkout onto the commit that change landed.",
    },
    {
      invariantKind: "departure",
      statement: "The install runs after the commit rather than before the gate.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing the install would not follow is answered as operational with the commit named.",
    },

    {
      invariantKind: "departure",
      statement: "A lockfile this command made for the change is recorded as read by nobody.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lockfile this command made for the change is held to no reading of the caller's.",
    },
    {
      invariantKind: "constraint",
      statement: "A reading is taken of the paths this repository has alone.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside this repository is recorded as read by nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside this repository is held to no reading of the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "Reaching a body tells a path nothing is at from a path that will not open.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not open is answered with why that body would not.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a check runs is the change kind's answer rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "A landing with no change kind runs every check.",
    },
    {
      invariantKind: "departure",
      statement: "A commit says why no check ran only where the glass was broken.",
    },
    {
      invariantKind: "absence",
      statement: "A change kind running no check writes nothing into the commit.",
    },
    {
      invariantKind: "gap",
      statement: "A caller is never told nothing happened when something did.",
    },
  ],
} as const satisfies Module
