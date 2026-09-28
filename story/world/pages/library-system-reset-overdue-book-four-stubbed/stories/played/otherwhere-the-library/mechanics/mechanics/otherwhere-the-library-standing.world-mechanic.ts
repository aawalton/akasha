import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereTheLibraryStanding = {
  id: "01a0e366-de42-7635-b8f9-c27d3c81ee79",
  type: "page-type/world-mechanic",
  slug: "otherwhere-the-library-standing",
  title: "Standing",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description:
    "Standing is how far a character who matters has come to trust and respect her, kept as relationship points on a world-relationship page naming her character and theirs, starting at nought; the first is with Links. The otherwhere-standing check scores it, rolling nothing, once for each such character present in a turn, judged on that turn alone: kept (did what she said, took on the Library's need, followed through), heard (let them finish, took their knowledge seriously, asked rather than assumed), shared (told the truth of herself, gave something freely), each nought to two, and crossed for each line of theirs she trampled (for Links: mocking his name or form, calling the Library a computer, threatening to leave it to die, treating him as a tool). The recorder or game master settles it with `akasha story settle --story otherwhere --check otherwhere-standing --reading <json>`, quoting the prose each score rests on, then adds the answered change to that relationship's points. Points set how the character behaves toward her, never whether she succeeds: below nought cold and withholding what he may withhold; nought to 9 wary, prickly, correct; 10 to 24 grudging warmth, volunteers help; 25 to 49 trusted, shares what he knows unasked and takes risks for her; 50 and up a friend who fights beside her. A character's standing is never shown as a number. Other characters, patrons and factions get their own relationship page when she first deals with them in earnest.",
} as const satisfies WorldMechanic
