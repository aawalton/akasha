import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXArthur = {
  id: "01a0ea75-19ea-78fb-bc36-1f7994754b0a",
  type: "page-type/lore",
  slug: "otherwhere-x-arthur",
  title: "Arthur",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-character/otherwhere-x-arthur",
  facts: [
    {
      fact: "Arthur is an old knight hired by House Vane to guard its noble expedition camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur is broad-shouldered and armored, with a scarred jaw and calloused hands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur wields a massive greatsword one-handed and sheathes it on his back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur moves so silently that Ben's senses cannot find him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur has [Sense Lie], which detects falsehoods, and senses cycling residue on others.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur is blunt and dead serious; he teaches youths by making them work things out alone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur is terrified of Lady Eris and cannot hold her gaze.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur respected Ben's Trance against an undead troll, waited, then killed the troll himself.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur questioned Ben, then offered him the expedition or a drop-off at a town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur barred Ben from leaving camp and argued against sending him into the rift.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur's side tested the rift but withholds its type so entrants learn to adapt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Now Arthur is at the hidden rift clearing near camp, sending group after group inside.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur is likely to guard the rift until the groups come out, then lead the camp to a town.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
