import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const akasha = {
  id: "01a049e9-651c-7000-b6c1-0d4d87c8b4c5",
  type: "page-type/domain",
  slug: "akasha",
  definition: "code, data and text in a page with a type in a file",
  parts: [
    "domain/alan",
    "domain/check",
    "domain/code",
    "domain/design",
    "domain/file",
    "domain/git",
    "domain/graph",
    "domain/infrastructure",
    "domain/product",
    "domain/story",
    "domain/temper",
    "domain/text",
    "domain/verdict",
    "page-type/agent",
    "page-type/change",
    "page-type/command",
    "page-type/domain",
    "page-type/page",
    "page-type/person",
    "page-type/persona",
    "workspace/akasha-workspace",
  ],
  directives: [
    {
      directiveKind: "directive-kind/principle",
      name: "Parsimony",
      act: "Require every piece to earn its place.",
      warrant: "A piece pays off only sometimes and costs always.",
      aids: [
        "Compare the piece against not having it.",
        "Never add a piece for a case not here yet.",
      ],
    },
    {
      directiveKind: "directive-kind/principle",
      name: "Cut The Obvious",
      act: "Keep an instruction only where Opus 5 consistently goes wrong without that instruction.",
      warrant: "A line the model would have obeyed anyway reads exactly like one the model needs.",
      aids: [
        "One agent's slip is not a consistent mistake.",
        "Test a single word the way you test a document.",
      ],
    },
    {
      directiveKind: "directive-kind/principle",
      name: "Cheap To Read",
      act: "Make every sentence cheaper to read, where nothing true and clear is lost.",
      warrant:
        "An agent has one budget for a turn, and what the agent spends reading is gone from the work.",
      aids: [
        "Naming a thing costs less than pointing at the thing.",
        "Repeating a noun is free.",
        "A narrower claim is better where the claim is truer.",
        "Shorter is not always cheaper.",
      ],
    },
    {
      directiveKind: "directive-kind/principle",
      name: "Plain Or Declared",
      act: "Write the plain phrase; give a word its own sense by declaring it a domain.",
      warrant:
        "Nobody looks up a word they read as ordinary, so the wrong sense is carried off silently.",
      aids: ["Use a declared word only in its declared sense."],
    },
    {
      directiveKind: "directive-kind/principle",
      name: "Ubiquitous Naming",
      act: "Use the same name for a concept in code, data and text.",
      warrant: "A second spelling reads as a second thing, and each layer looks right by itself.",
      aids: [
        "A rename lands in every layer at once.",
        "Never swap in a synonym to avoid repeating.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Currency",
      act: "State what is true now, and leave how it became true to git.",
      warrant: "Git has the history, writing it again is a second place that can be wrong.",
      aids: [
        "Mortal pages become history.",
        "Write for the new reader who doesn't know what was there before.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Alan Over Decisions",
      act: "Change the decisions Alan's instructions contradict.",
      warrant: "A decision is past thinking, which is updated by current thinking.",
      aids: ["Any decision can change.", "Changing one needs no approval."],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Trust The Index",
      act: "Read what the index answers. Never check the index is there, and never re-derive the answer.",
      warrant:
        "A reader that validates pays on every call for a fault a command should never have written.",
      aids: ["A wrong index is a root cause to fix, not a case each reader handles."],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Headroom",
      act: "Never report a file nearing its length ceiling, in your own words or in an instrument's.",
      warrant:
        "A ceiling makes the next write divide the file, so a file just under it is the ceiling working.",
      aids: [
        "A file the check has not refused is not too long.",
        "Say how long a file is only if asked.",
        "Never propose raising the ceiling for a file that came near it.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Champions Not Owners",
      act: "Change what needs changing in any domain, where you hold what the change takes.",
      warrant: "Every agent has the same base expertise and can access the same context.",
      aids: [
        "Fix issues you already have the context for.",
        "Get context and then fix issues blocking your work.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Small Changes",
      act: "Make many small, safe changes, and land separately every change that can land separately.",
      warrant:
        "Checking a landing costs the square of how many changes it has, so a big landing wastes time.",
      aids: [
        "Two changes that do not need each other are two landings.",
        "A change is safe where landing it alone leaves the repository working.",
        "A refusal over many changes hides which change drew it.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Blame The Mechanism",
      act: "Treat a fault a mechanical change lands as a fault in the program that composed the change.",
      warrant: "Akasha is a database, and no swarm can judge every page the swarm writes.",
      aids: [
        "Mend the program, never the one landing.",
        "Restore what the change already landed, as well as mending the program.",
        "The audit finds what no check saw.",
      ],
    },
  ],
  linkedAt: "~/.local/share/code-editor/extensions/ops",
} as const satisfies Domain
