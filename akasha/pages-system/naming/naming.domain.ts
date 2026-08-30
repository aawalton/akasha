import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const naming = {
  id: "01a05341-b9a9-7d68-88b3-142e3e3ecd4d",
  pageTypeSlug: "domain",
  slug: "naming",
  definition: "how one idea's name is chosen",
  invariants: [
    {
      invariantKind: "absence",
      statement:
        "Nothing here says when a name is worth drafting against, only how it is done once it is.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Say It Without The Name",
      act: "Write one sentence for what the thing is, using none of the words in its standing name.",
      warrant: "The names drafted next are only as wide as that sentence.",
      aids: ["A sentence carrying the old word returns ten spellings of that word."],
    },
    {
      directiveKind: "rule",
      name: "Ten Not Three",
      act: "Give ten names, not the three or four that arrive before the drafting gets hard.",
      warrant: "A field of three hands the standing name the win by default.",
      aids: ["Denying it that win is the whole of the exercise."],
    },
    {
      directiveKind: "rule",
      name: "Draft Away From It",
      act: "Draft the ten without the standing name in front of you, and without near-variants of it.",
      warrant: "A name read a hundred times reads as correct whatever it says.",
      aids: ["Drafting beside it returns ten spellings of it."],
    },
    {
      directiveKind: "rule",
      name: "The Plainest Word",
      act: "Write each name in the plainest word the reader already uses in the sense you mean.",
      warrant: "A word that has to be explained was chosen for its sound.",
      aids: [
        "It sounds best to whoever just drafted it.",
        "Say it aloud in a sentence: a word you would not speak is not the plainest one.",
      ],
    },
    {
      directiveKind: "rule",
      name: "An Eleventh That Can Win",
      act: "Put the standing name back beside the ten, as an eleventh that can win.",
      warrant: "A name already right loses nothing by being drafted against.",
      aids: ["Standing earned it nothing.", "Barring it makes every exercise a rename."],
    },
    {
      directiveKind: "rule",
      name: "One Line Each",
      act: "Say in one line what each name claims the thing is.",
      warrant: "The choice then runs between claims rather than between sounds.",
      aids: ["A name handed over without its claim is handed over as a sound."],
    },
    {
      directiveKind: "rule",
      name: "Pick After Not Instead",
      act: "Give your own pick after the eleven, never instead of them.",
      warrant: "The choice belongs to the reader.",
      aids: ["Holding a view back spends their turn on work you could have done."],
    },
  ],
} as const satisfies Domain
