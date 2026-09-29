import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveGorgon = {
  id: "01a0e9f2-0aaf-713f-8794-cd6f18c532be",
  type: "page-type/lore",
  slug: "super-supportive-gorgon",
  title: "Gorgon",
  world: "world/super-supportive",
  about: "character-other/super-supportive-gorgon",
  facts: [
    {
      fact: "He is about five feet tall, with smooth gray skin like a stingray's and black shark-like eyes.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "He has a wide flat nose with four nostril slits and possibly no ears.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "A couple dozen horns curve around his skull and flare into a spiky choker around his neck.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "Glowing golden magical bindings chain him to the desk, and his wrists are raw beneath them.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "He watches the security monitors, avoids eye contact and needs little sleep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He keeps his eyes on the desk's security monitors, away from the phones pointed at him.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "He senses no trace of the System on Nala, and a faint, new-made strangeness he cannot place.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His voice is high-pitched, with an undertone like breaking glass.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "His laugh is a repetitive hissing.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "He can reach all public areas of the consulate but has no room of his own.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He can smell attraction and pity on humans.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
