import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereTheLibraryCheckInCounter = {
  id: "01a0e952-ef90-7a86-a61d-99554952631a",
  type: "page-type/place",
  slug: "otherwhere-the-library-check-in-counter",
  title: "The Check-in Counter",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  within: "place/otherwhere-i-main-hall",
  depth: 0,
  facts: [
    {
      fact: "The Check-in Counter is carved with trees blossoming into books, words strung like leaves.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Nala has seen a huge raised desk at the hall's front, carved with trees blossoming into books.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The Counter's carved trees glow gold, and a hand-shaped patch of light waits on its desk.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "Restored, the Counter shows as Check-in Counter, Operational, Administrator: Nala.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Resending the packet is a great working of 10 power, asked at the Counter, loading as she sleeps.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-i-links"],
    },
    {
      fact: "The packet gives a new Librarian the Library's layout, rules and staff roles, and nothing hidden.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-i-links"],
    },
    {
      fact: "The failed information packet can be resent only through the Check-in Counter, once it works.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The Librarian opens the Library's doors to patrons by her word at the working Counter.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-i-links"],
    },
    {
      fact: "Once the doors open, a few patrons a day find their way in at first, whoever needs the Library.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-i-links"],
    },
    {
      fact: "With Counter Keeping's power, a Librarian lends a book by laying it and her palm on the Counter.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-i-links"],
    },
    {
      fact: "Counter Keeping also teaches taking a book back in at the Counter, and marking one late.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-i-links"],
    },
    {
      fact: "The Library shows a lent book as Lent, with its borrower and the day it falls due.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-i-links"],
    },
    {
      fact: "Lending costs a Librarian no mana; the Counter draws on the Library's own power.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-i-links"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
