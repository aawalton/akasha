import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvTheSystem = {
  id: "01a0ed27-f4e1-7cc4-ae7c-ad2fcf04fc44",
  type: "page-type/lore",
  slug: "overwhere-iv-the-system",
  title: "The System",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  about: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The System is the order of levels, classes, races, traits, skills and points all beings live under.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Any being can call up its own status window by will; nobody else can see it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A status window opens with the lines Name, Race, Class, Status and Mana, in that order.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The name line reads like "Name: Syl [Demon Slayer]", the chosen Emblem in brackets after the name.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A being never named shows "Name: -" on its window.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A race line reads like "Race: Human LV 1", the race followed by its level.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A class line reads like "Class: Mage LV 12"; a being without a class shows "Class: -".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A newborn slime's window reads Name: -, Race: Slime (Blue) LV 1, Class: -, Status: Healthy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The status line reads "Status: Healthy" for a well being and "Status: Dead" for a dead one.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A being with deep reserves shows "Mana: Overflowing" on its window.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Below the header comes "Emblems:" with every Emblem held, each name in square brackets.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An asterisk after an Emblem on the list marks the one currently equipped.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Next comes the line "Legend Points remaining: N" for those who have unlocked Legend Points.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Then "Traits:" lists every trait, sorted under headings such as Core, Mana and Senses.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The trait list ends with the line "Trait Points remaining: N".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Then "Skills:" lists skills under headings such as General, Combat, Magic, Tamer and Sneaky.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The skill list ends with the line "Skill Points remaining: N".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Last comes "Profession:" with craft skills by trade, e.g. Enchanting, then the profession points.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The profession section ends with "Profession Points Remaining: N".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A levelled entry reads "[Identify LV 6]"; an entry with no levels is just its name, "[Brand]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A trait or skill at its cap reads "LV MAX", as in "[Chroma Shift LV MAX]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "System messages arrive as text in angle brackets, seen only by the one they concern.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A kill notice reads "<Griffin LV 8 defeated. Experience gained.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A classed foe\'s kill notice names both: "<Mermen Knight LV 28; Depthstriker LV 39 defeated.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A named foe's kill notice gives the name: \"<Traz'genauth Egrozk Xog'thizech defeated.>\".",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Kill notices name a foe\'s race even without Identify, e.g. "Demonized Orc".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'First sight of a monster may flash its race and level, as "<Griffin LV 8.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kill notices can be muted for a time by the one receiving them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Use of a skill or trait yields "<Proficiency gained. [X LV 4] improved to [X LV 5].>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A class level reads "<Class Experience threshold reached. Elementalist is now LV 23.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A race level reads "<Racial Experience threshold reached. [race] is now LV 2.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Point notices give the running total: "<12 Skill Points are now available.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Trait and profession point notices match: "<17 Trait Points are now available.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A purchase reads "<Skill [Warp LV 1] obtained. Skill Points remaining: 9.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A trait purchase reads "<Trait [Sub-Core Pi LV 1] obtained. Trait Points remaining: 18.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A barred purchase answers "<Class requirements not met.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A trait wrong for one\'s body answers "<Trait [X] is incompatible with your race.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A trait or skill half-learned by use shows as "[??? LV 0]" until it becomes real.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The change reads "<Trait [??? LV 0] has become [Echolocation LV 1].>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A lost ability reads "<Skill [Blink LV 5] has been lost.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A lost magic\'s spells read "<[Magma Magic LV 1] spell [Molten] has been forgotten.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A magic skill\'s new spell reads "<[Magma Magic LV 2] spell [Erupt] learned.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Casting an official spell before being taught it reads "<Spell [Blink] discovered.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Early finds add "<Awarding bonus proficiency experience for early discovery.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Quests come as "<Quest received: ...>", sometimes with a "Reward:" line.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Quest changes read "<Quest updated: ...>" with Reward, Subquest and Subquest Reward lines.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A finished quest reads "<Quest completed!>"; its reward is then announced.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A mind spell fought off shows "<[Beguile] has been detected.>" or "<[Allure] has been resisted.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'An ended spell on oneself reads "<[Stasis] has been removed.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Hazards come as warnings, e.g. "<Warning: Maximum [Sub-Core] limit has been reached.>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Several level changes at once can arrive as a single list inside one pair of brackets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Every trait and skill has a description, shown as "<[Name] ...>" when examined.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Descriptions tell what levels improve, e.g. "Skill level determines Mana efficiency".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Some descriptions end in fixed notes such as "This trait has no levels.".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Certain words are censored by the world itself: spoken, they come out as "[Skill D#####]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Written text on censored matters blurs before the eyes of those not allowed to know.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
