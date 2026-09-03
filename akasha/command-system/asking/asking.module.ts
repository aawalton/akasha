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
      statement: "Why a report could not be built is said in the report.",
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
      statement: "A draft is gated as a landing is gated.",
    },
    {
      invariantKind: "departure",
      statement: "A draft keeps a patch rather than writing a file.",
    },
    {
      invariantKind: "departure",
      statement: "A draft and a dry run name two answers.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming a draft and a dry run together is refused.",
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
      statement: "What a draft left is named in the report as what was drafted.",
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
      statement: "A body that landed other than as it was handed in is named in the report.",
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
      statement: "A reading is taken of what is under `akasha/` alone.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside `akasha/` is recorded as read by nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside `akasha/` is held to no reading of the caller's.",
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
      statement: "A page whose slug names no export refuses the change it was handed in with.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal stands with the minting rather than among the checks.",
    },
    {
      invariantKind: "departure",
      statement: "A change kind running no check is held to it too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is judged for it only where its file is named for the slug the body states.",
    },
    {
      invariantKind: "absence",
      statement: "A body holding a page's text in a template is no page and is judged as none.",
    },
    {
      invariantKind: "gap",
      statement: "A caller is never told nothing happened when something did.",
    },
  ],
} as const satisfies Module
