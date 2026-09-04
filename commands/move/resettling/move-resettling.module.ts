import type { Module } from "@akasha/code-system/module"

export const moveResettling = {
  id: "01a062fe-9cb1-7206-be2f-34f5df0717c9",
  pageTypeSlug: "module",
  slug: "move-resettling",
  definition:
    "the agent settings document a live seat watches, rewritten so the paths it names follow what moved",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A settings document is untracked.",
    },
    {
      invariantKind: "constraint",
      statement: "A settings document sits outside this repository.",
    },
    {
      invariantKind: "constraint",
      statement: "A settings document is read once at a spawn.",
    },
    {
      invariantKind: "departure",
      statement: "A settings document is told by the stem and the tail of the file name.",
    },
    {
      invariantKind: "departure",
      statement: "A settings document is looked for in the folder a live command line names.",
    },
    {
      invariantKind: "departure",
      statement: "A live command line is read off `/proc`.",
    },
    {
      invariantKind: "departure",
      statement: "A settings document named after the flag is read.",
    },
    {
      invariantKind: "departure",
      statement: "A settings document named joined to the flag is read.",
    },
    {
      invariantKind: "departure",
      statement: "Every settings document in that folder is looked at.",
    },
    {
      invariantKind: "absence",
      statement: "Being named by no live process passes no settings document over.",
    },
    {
      invariantKind: "departure",
      statement: "Which settings documents a live process names is reported.",
    },
    {
      invariantKind: "absence",
      statement: "Which settings documents a live process names gates no rewrite.",
    },
    {
      invariantKind: "absence",
      statement: "A folder no live command line names a settings document in is not looked in.",
    },
    {
      invariantKind: "absence",
      statement: "No folder a settings document sits in is spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A path that moved is rewritten where a spelling of this checkout's root leads.",
    },
    {
      invariantKind: "departure",
      statement: "The spellings of that root are worked out from the root and the home folder.",
    },
    {
      invariantKind: "departure",
      statement: "The spelling of the root a settings document used is the spelling written back.",
    },
    {
      invariantKind: "absence",
      statement: "A name carrying more of a segment than the path that moved is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "A path no spelling of this checkout's root leads is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "A relative path is read as no reach into this checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is rewritten before the commit carrying the move has landed.",
    },
    {
      invariantKind: "absence",
      statement: "A move that refused rewrites no settings document.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run names every settings document a rewrite would reach.",
    },
    {
      invariantKind: "absence",
      statement: "A dry run rewrites no settings document.",
    },
    {
      invariantKind: "departure",
      statement: "A settings document that would not be read or written is reported.",
    },
    {
      invariantKind: "departure",
      statement: "A move lands though a settings document would not be read or written.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each settings document that would not take the rewrite is named rather than counted.",
    },
    {
      invariantKind: "departure",
      statement: "What a seat left on the old paths needs is said beside that seat's own document.",
    },
    {
      invariantKind: "absence",
      statement: "No settings document enters the change the gate judges.",
    },
    {
      invariantKind: "absence",
      statement: "A settings document is recorded as read by nobody.",
    },
    {
      invariantKind: "absence",
      statement: "A settings document is held to no reading of the caller's.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "gap",
      statement: "A client holding a settings document by no path is reached by nothing here.",
    },
  ],
} as const satisfies Module
