import type { Module } from "@akasha/code-system/module"

export const asking = {
  id: "01a04df0-ecce-7c46-bec3-1461348a7d55",
  pageTypeSlug: "module",
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
      statement: "A draft runs the checks a landing runs and the warrants a landing runs.",
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
      statement: "A body drafted is recorded as read by nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch carries a conflict at is named in the report as well.",
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
      statement: "What a draft was judged over is the patch rather than the call's own paths.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dry run judges what is there as the dry run runs rather than what a later landing will judge.",
    },
    {
      invariantKind: "departure",
      statement: "A body of a kind the formatter owns is formatted before the gate sees the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body of any other kind reaches the gate as the caller handed the body in.",
    },
    {
      invariantKind: "departure",
      statement: "A removal is never formatted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change carrying a package manifest carries the lockfile those manifests warrant.",
    },
    {
      invariantKind: "departure",
      statement: "The lockfile is made again before the gate sees the change.",
    },
    {
      invariantKind: "departure",
      statement: "A lockfile that could not be made is said rather than refusing the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change carrying a package manifest installs the checkout onto the commit it landed.",
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
      statement: "A body the caller asked for is recorded as read by whoever landed that body.",
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
      statement: "A reading is taken of what this repository holds alone.",
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
      statement: "Reaching a body tells a path standing at nothing from one that will not open.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not open is answered with why it would not.",
    },
    {
      invariantKind: "departure",
      statement: "A program landing a change is handed the caller a program lands through.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a check runs is the change kind's answer rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "A landing carrying no change kind runs every check.",
    },
    {
      invariantKind: "departure",
      statement: "The kind that ran no check is named in the commit as the reason none ran.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose slug names no export refuses the change carrying that page.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is made with the minting rather than among the checks.",
    },
    {
      invariantKind: "departure",
      statement: "A change kind running no check is held to that refusal too.",
    },
    {
      invariantKind: "departure",
      statement:
        "An export name is judged only where a body's file is named for the slug that body states.",
    },
    {
      invariantKind: "absence",
      statement:
        "A body holding a page's text in a template is no page and is judged for no export name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mechanical change under an agent id is drafted into that agent's patch rather than landed.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change under no agent id is landed rather than drafted.",
    },
    {
      invariantKind: "gap",
      statement: "A caller is never told nothing happened when something did.",
    },
  ],
} as const satisfies Module
