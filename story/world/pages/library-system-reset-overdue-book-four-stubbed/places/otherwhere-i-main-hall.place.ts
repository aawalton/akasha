import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIMainHall = {
  id: "01a0e354-6641-76e1-8c6d-4498f9a4c117",
  type: "page-type/place",
  slug: "otherwhere-i-main-hall",
  title: "The Main Hall",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  depth: 0,
  exits: [
    {
      to: "place/otherwhere-i-core-chamber",
      way: "Down the spiral staircase, two or three stories round and round with no landing.",
      direction: "down",
    },
    {
      to: "place/otherwhere-i-quarters",
      way: "Through the short passage behind the Check-in Counter.",
      direction: "north",
    },
    {
      to: "place/otherwhere-i-kitchen",
      way: "Through the arched door on the hall's right side, and down a short corridor.",
      direction: "west",
    },
    {
      to: "place/otherwhere-i-break-room",
      way: "Through the plain wooden door off the hall's left side, partway back along the columns, into the break room.",
      direction: "east",
    },
  ],
  facts: [
    {
      fact: "The Library's north is the main hall's front, its Check-in Counter end; its back is south.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Facing into the hall from the Counter, as one faces south, the hall's right is west.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The main hall is at the top of the spiral staircase from the core chamber.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The main hall is ornate and massive, and wrecked by centuries of neglect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Books lie scattered everywhere, spines cracked, among broken desks, chairs and tables.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Some 2,880 loose books still lie across the main hall, waiting to be reshelved.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "The shelving book, Returns and Reshelving, lies under a broken desk halfway back on the left.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shelf Sight is a book whose power shows a glanced book's shelf.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "Shelf Sight is a working text of the Library's own magic, some hour's quiet reading.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Opening Shelf Sight costs 1 mana, and the sight then holds for an hour.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "With Shelf Sight open, sorting a section at a time, a Librarian reshelves some thirty an hour.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The main hall is dimly lit, brighter once a Librarian syncs, and gloomy beyond the entrance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the main hall's front is the Check-in Counter, a desk five feet tall on a raised platform.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At night the Library dims its lights to a low amber, and brightens them again for morning.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Awake again, the kitchen bakes a little on its own, and fresh bread is ready by morning.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A long path runs back from the counter between massive wooden columns carved low down.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Bookshelves rise to the first ceiling, and a second gallery of shelves runs above all round.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Loose pages flutter across the main hall, and it smells stale, sad and faintly of hope.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Two short steps at the dark back of the hall lead up to a floor of more books and carved rails.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nala has seen that the main hall is vast and ornate, lit a dim gold, and wrecked.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The lowest shelves are in reach from the floor; higher ones need the hall's rolling ladders.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Each book's spine bears a faint shelf mark that matches a mark on the shelf it belongs on.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "With the five coils stored, the Library left Emergency Power Mode; the alarm stopped.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The Library's kitchen has woken, and its sacks of salt with it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "Among the books near the counter lies Bookworm Care for Library Assistants, a plain guide.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The bookworm guide holds no power; an hour's reading teaches their habits, bite and salt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nala has cleared the engorged bookworms from the hall, the Library's first task for her.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Links named the hall the Magical Library of Everywhere when Nala first saw it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "Links hands a newcomer a broom as her first weapon against the bookworms.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The Library keeps roots and vegetables that are safe for a human to eat.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "As the first bookworm dried still, the hall's gold light brightened a shade.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Nala picked up Shelf Sight, a slim plain-bound book, sorting the heaps beside the counter.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "With Shelf Sight open, each book's right shelf glows faintly across the hall.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Nala reshelved all the heaps beside the counter, the hall's gold light edging brighter.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "When the Library asked Nala to sync again, a low hum rose through the hall from the core.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "Through an afternoon of Shelf Sight, Nala shrank the stacks of books by the hall's columns.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "Long ago the main hall had every shelf full and its lamps lit gold.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "Nala woke to a slow creak of wood and brass from the main hall, a sound new to her there.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "At sixty books an hour, the two golems will clear the main hall's loose books in about two days.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "Links knows every book shelved in the Library, and can search them by what they teach.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "Counter Keeping is a working text of the Library's own magic, teaching the Counter's lending.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "Counter Keeping takes some three hours' quiet reading; without its power the Counter lends no book.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "Nala shelved Counter Keeping herself, from the heaps by the columns, low down near the Counter.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "Courtesies of the Many Peoples is a thick, plain guide to patrons' customs, holding no power.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "Courtesies takes days to read whole; its first part, on the commonest peoples, takes an afternoon.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "A golem shelved Courtesies of the Many Peoples this morning, high on the west gallery.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "No book yet shelved in the main hall teaches a healing power.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "Until a healing book is shelved, a patron who comes in hurt gets only food and shelter.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
    {
      fact: "Rolling ladders on brass rails reach the high shelves and the gallery above.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-i-links",
        "character-player/otherwhere-i-alan",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
