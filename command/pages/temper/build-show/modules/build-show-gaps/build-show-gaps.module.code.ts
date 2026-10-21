import type { StarPoints } from "akasha/command/pages/temper/build-show/modules/build-show-fields/build-show-fields.module.code.ts"
import { championPoints } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { equipmentQualities } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { vampireStages } from "akasha/temper/player/character/source/modules/vampire-stages/vampire-stages.module.code.ts"

type Build = CharacterState

type Closing = {
  readonly place: string
  readonly want: string
  readonly have: string
  readonly close: (draft: Build) => void
}

const BARS = [
  ["front", "primary-weapon-bar", "primary-skill-bar"],
  ["back", "backup-weapon-bar", "backup-skill-bar"],
] as const

const CONSTELLATIONS = ["warfare", "fitness", "craft"] as const

function none(id: string | undefined): id is undefined {
  return id === undefined || id.startsWith("no-")
}

function lacking(
  place: string,
  want: string,
  have: string | undefined,
  close: Closing["close"]
): Closing {
  return { place, want, have: none(have) ? "none" : have, close }
}

export function closed(build: Build, closing: Closing): Build {
  const draft = structuredClone(build)
  closing.close(draft)
  return draft
}

function characterGaps(design: Build, character: Build): readonly Closing[] {
  const want = design.character
  const have = character.character
  const found: Closing[] = []
  if (!none(want.mundusStone) && want.mundusStone !== have.mundusStone) {
    found.push(
      lacking("mundus", want.mundusStone, have.mundusStone, (draft) => {
        draft.character.mundusStone = want.mundusStone
      })
    )
  }
  if (!none(want.curseState) && want.curseState !== have.curseState) {
    found.push(
      lacking("curse", want.curseState, have.curseState, (draft) => {
        draft.character.curseState = want.curseState
      })
    )
  }
  const stages = vampireStages()
  const stageOf = (id: string): number => stages.data[id]?.stage ?? 0
  if (stageOf(want.vampireStage) > stageOf(have.vampireStage)) {
    found.push(
      lacking("vampire stage", want.vampireStage, have.vampireStage, (draft) => {
        draft.character.vampireStage = want.vampireStage
      })
    )
  }
  want.skillLineIds.forEach((line, at) => {
    if (none(line) || have.skillLineIds.includes(line)) return
    found.push(
      lacking("skill line", line, have.skillLineIds[at], (draft) => {
        const lines = [...draft.character.skillLineIds]
        lines[at] = line
        draft.character.skillLineIds = lines
      })
    )
  })
  return found
}

function consumableGaps(design: Build, character: Build): readonly Closing[] {
  const want = design.consumables
  const have = character.consumables
  const found: Closing[] = []
  if (!none(want.foodOrDrink) && want.foodOrDrink !== have.foodOrDrink) {
    found.push(
      lacking("food or drink", want.foodOrDrink, have.foodOrDrink, (draft) => {
        draft.consumables.foodOrDrink = want.foodOrDrink
      })
    )
  }
  for (const [key, place] of [
    ["potion", "potion"],
    ["potion2", "second potion"],
  ] as const) {
    const potion = want[key]
    if (none(potion) || potion === have.potion || potion === have.potion2) continue
    found.push(
      lacking(place, potion, have[key], (draft) => {
        draft.consumables[key] = potion
      })
    )
  }
  return found
}

type Piece = {
  readonly set?: string
  readonly type?: string
  readonly weight?: string
  readonly trait?: string
  readonly enchantment?: string
  readonly enchantmentQuality?: string
  readonly enchantmentSubtype?: number
  readonly quality?: string
}

type Held = { readonly itemType: string; readonly data: Piece | null }

type GroupName = "armor" | "jewelry" | "primary-weapon-bar" | "backup-weapon-bar"

function groupOf(build: Build, name: GroupName): ReadonlyMap<string, Held> {
  return new Map<string, Held>(Object.entries(build.equipment[name]))
}

function put(draft: Build, name: GroupName, key: string, held: Held): undefined {
  Object.assign(draft.equipment[name], { [key]: held })
}

type Slot = { readonly place: string; readonly group: GroupName; readonly key: string }

function slotsOf(design: Build): readonly Slot[] {
  const named: readonly (readonly [GroupName, string])[] = [
    ["armor", ""],
    ["jewelry", ""],
    ...BARS.map(([bar, weaponBar]) => [weaponBar, `${bar} `] as const),
  ]
  return named.flatMap(([group, prefix]) =>
    [...groupOf(design, group).keys()].map((key) => ({ place: `${prefix}${key}`, group, key }))
  )
}

function empty(piece: Piece | null | undefined): piece is null | undefined {
  return piece == null || (none(piece.type) && none(piece.set))
}

function qualityRank(quality: string | undefined): number {
  const qualities = equipmentQualities()
  const id =
    quality !== undefined && qualities.has(quality)
      ? quality
      : qualities.ids.find((one) => qualities.data[one].isDefault)
  return id === undefined ? 0 : qualities.data[id].esoDisplayQuality
}

function pieceGaps(slot: Slot, want: Piece, have: Piece): readonly Closing[] {
  const found: Closing[] = []
  const changed = (
    what: string,
    wanted: string,
    had: string | undefined,
    patch: Piece
  ): undefined => {
    found.push(
      lacking(`${slot.place} ${what}`, wanted, had, (draft) => {
        const now = groupOf(draft, slot.group).get(slot.key)
        if (now?.data == null) return
        put(draft, slot.group, slot.key, {
          itemType: now.itemType,
          data: { ...now.data, ...patch },
        })
      })
    )
  }
  if (!none(want.set) && want.set !== have.set)
    changed("set", want.set, have.set, { set: want.set })
  if (slot.group !== "armor" && slot.group !== "jewelry") {
    if (!none(want.type) && want.type !== have.type) {
      changed("weapon type", want.type, have.type, { type: want.type, weight: want.weight })
    }
  }
  if (!none(want.trait) && want.trait !== have.trait) {
    changed("trait", want.trait, have.trait, { trait: want.trait })
  }
  if (!none(want.enchantment)) {
    const enchant: Piece = {
      enchantment: want.enchantment,
      enchantmentQuality: want.enchantmentQuality,
      enchantmentSubtype: want.enchantmentSubtype,
    }
    if (want.enchantment !== have.enchantment) {
      changed("enchant", want.enchantment, have.enchantment, enchant)
    } else if (qualityRank(want.enchantmentQuality) > qualityRank(have.enchantmentQuality)) {
      changed(
        "enchant quality",
        want.enchantmentQuality ?? "default",
        have.enchantmentQuality,
        enchant
      )
    }
  }
  if (qualityRank(want.quality) > qualityRank(have.quality)) {
    changed("quality", want.quality ?? "default", have.quality, { quality: want.quality })
  }
  return found
}

function gearGaps(design: Build, character: Build): readonly Closing[] {
  return slotsOf(design).flatMap((slot): readonly Closing[] => {
    const wanted = groupOf(design, slot.group).get(slot.key)
    const want = wanted?.data
    if (wanted === undefined || empty(want)) return []
    const have = groupOf(character, slot.group).get(slot.key)?.data
    if (empty(have)) {
      const named = [want.set, want.type].filter((one) => !none(one)).join(" ")
      return [
        lacking(`${slot.place} piece`, named, undefined, (draft) =>
          put(draft, slot.group, slot.key, structuredClone(wanted))
        ),
      ]
    }
    return pieceGaps(slot, want, have)
  })
}

function skillGaps(design: Build, character: Build): readonly Closing[] {
  const slotted = BARS.flatMap(([bar, , skillBar]) => {
    const had = new Map<string, string>(Object.entries(character.skills[skillBar]))
    return Object.entries(design.skills[skillBar]).flatMap(([key, id]): readonly Closing[] => {
      if (none(id) || id === had.get(key)) return []
      return [
        lacking(`${bar} bar ${key}`, id, had.get(key), (draft) => {
          Object.assign(draft.skills[skillBar], { [key]: id })
        }),
      ]
    })
  })
  const scribed = design.scribing.flatMap((want): readonly Closing[] => {
    const have = character.scribing.find((one) => one.skillId === want.skillId)
    if (have !== undefined && JSON.stringify(have) === JSON.stringify(want)) return []
    const scripts = (one: typeof want): string =>
      `${one.focusScriptId}, ${one.signatureScriptId}, ${one.affixScriptId}`
    return [
      lacking(
        `scribed ${want.skillId}`,
        scripts(want),
        have === undefined ? undefined : scripts(have),
        (draft) => {
          draft.scribing = [...draft.scribing.filter((one) => one.skillId !== want.skillId), want]
        }
      ),
    ]
  })
  return [...slotted, ...scribed]
}

function rankText(rank: number | undefined): string {
  return rank === undefined ? "held" : `rank ${String(rank)}`
}

function passiveGaps(design: Build, character: Build): readonly Closing[] {
  const wantRanks: Readonly<Record<string, number | undefined>> = design.passiveRanks ?? {}
  const haveRanks: Readonly<Record<string, number | undefined>> = character.passiveRanks ?? {}
  return design.passives.flatMap((id): readonly Closing[] => {
    const want = wantRanks[id]
    const have = haveRanks[id]
    const held = character.passives.includes(id)
    if (held && (want === undefined || have === undefined || have >= want)) return []
    return [
      lacking(`passive ${id}`, rankText(want), held ? rankText(have) : undefined, (draft) => {
        if (!draft.passives.includes(id)) draft.passives = [...draft.passives, id]
        if (want !== undefined) draft.passiveRanks = { ...draft.passiveRanks, [id]: want }
      }),
    ]
  })
}

function starGaps(design: Build, character: Build): readonly Closing[] {
  return CONSTELLATIONS.flatMap((constellation) => {
    const want = design.championPoints[constellation]
    const have = character.championPoints[constellation]
    const slotted = want.slotted.flatMap((id, at): readonly Closing[] => {
      if (none(id) || have.slotted.includes(id)) return []
      return [
        lacking(`${constellation} slotted star`, id, have.slotted[at], (draft) => {
          const stars = [...draft.championPoints[constellation].slotted]
          stars[at] = id
          draft.championPoints[constellation].slotted = stars
        }),
      ]
    })
    const passive = want.passive.flatMap((id): readonly Closing[] => {
      if (none(id) || have.passive.includes(id)) return []
      return [
        lacking(`${constellation} passive star`, id, undefined, (draft) => {
          const held = draft.championPoints[constellation]
          held.passive = [...held.passive, id]
        }),
      ]
    })
    return [...slotted, ...passive]
  })
}

function pointGaps(
  designStars: readonly StarPoints[] | null,
  characterStars: readonly StarPoints[] | null
): readonly Closing[] {
  if (designStars === null || characterStars === null) return []
  const byGame = new Map(championPoints.list.map((star) => [star.esoChampionSkillId, star.id]))
  const held = new Map(characterStars.map((star) => [star.championSkillId, star.points]))
  return designStars.flatMap((star): readonly Closing[] => {
    const have = held.get(star.championSkillId) ?? 0
    if (have >= star.points) return []
    const id = byGame.get(star.championSkillId) ?? String(star.championSkillId)
    return [lacking(`points in ${id}`, String(star.points), String(have), () => undefined)]
  })
}

export function closingsOf(
  design: Build,
  character: Build,
  designStars: readonly StarPoints[] | null,
  characterStars: readonly StarPoints[] | null
): readonly Closing[] {
  return [
    ...characterGaps(design, character),
    ...consumableGaps(design, character),
    ...gearGaps(design, character),
    ...skillGaps(design, character),
    ...passiveGaps(design, character),
    ...starGaps(design, character),
    ...pointGaps(designStars, characterStars),
  ]
}
