import { anequina } from "akasha/temper/catalog/gear/temper-motif-style/pages/anequina.temper-motif-style.ts"
import { apostle } from "akasha/temper/catalog/gear/temper-motif-style/pages/apostle.temper-motif-style.ts"
import { arkthzandArmory } from "akasha/temper/catalog/gear/temper-motif-style/pages/arkthzand-armory.temper-motif-style.ts"
import { ashlander } from "akasha/temper/catalog/gear/temper-motif-style/pages/ashlander.temper-motif-style.ts"
import { blackFinLegion } from "akasha/temper/catalog/gear/temper-motif-style/pages/black-fin-legion.temper-motif-style.ts"
import { blackreachVanguard } from "akasha/temper/catalog/gear/temper-motif-style/pages/blackreach-vanguard.temper-motif-style.ts"
import { deadKeeper } from "akasha/temper/catalog/gear/temper-motif-style/pages/dead-keeper.temper-motif-style.ts"
import { deadWater } from "akasha/temper/catalog/gear/temper-motif-style/pages/dead-water.temper-motif-style.ts"
import { dragonguard } from "akasha/temper/catalog/gear/temper-motif-style/pages/dragonguard.temper-motif-style.ts"
import { draugr } from "akasha/temper/catalog/gear/temper-motif-style/pages/draugr.temper-motif-style.ts"
import { ebonshadow } from "akasha/temper/catalog/gear/temper-motif-style/pages/ebonshadow.temper-motif-style.ts"
import { elderArgonian } from "akasha/temper/catalog/gear/temper-motif-style/pages/elder-argonian.temper-motif-style.ts"
import { fargraveGuardian } from "akasha/temper/catalog/gear/temper-motif-style/pages/fargrave-guardian.temper-motif-style.ts"
import { firesong } from "akasha/temper/catalog/gear/temper-motif-style/pages/firesong.temper-motif-style.ts"
import { greymoor } from "akasha/temper/catalog/gear/temper-motif-style/pages/greymoor.temper-motif-style.ts"
import { houseHexos } from "akasha/temper/catalog/gear/temper-motif-style/pages/house-hexos.temper-motif-style.ts"
import { houseMornard } from "akasha/temper/catalog/gear/temper-motif-style/pages/house-mornard.temper-motif-style.ts"
import { ivoryBrigade } from "akasha/temper/catalog/gear/temper-motif-style/pages/ivory-brigade.temper-motif-style.ts"
import { malacath } from "akasha/temper/catalog/gear/temper-motif-style/pages/malacath.temper-motif-style.ts"
import { moragTong } from "akasha/temper/catalog/gear/temper-motif-style/pages/morag-tong.temper-motif-style.ts"
import { nighthollow } from "akasha/temper/catalog/gear/temper-motif-style/pages/nighthollow.temper-motif-style.ts"
import { pellitine } from "akasha/temper/catalog/gear/temper-motif-style/pages/pellitine.temper-motif-style.ts"
import { sapiarch } from "akasha/temper/catalog/gear/temper-motif-style/pages/sapiarch.temper-motif-style.ts"
import { shardborn } from "akasha/temper/catalog/gear/temper-motif-style/pages/shardborn.temper-motif-style.ts"
import { shieldOfSenchal } from "akasha/temper/catalog/gear/temper-motif-style/pages/shield-of-senchal.temper-motif-style.ts"
import { steadfastSociety } from "akasha/temper/catalog/gear/temper-motif-style/pages/steadfast-society.temper-motif-style.ts"
import { systresGuardian } from "akasha/temper/catalog/gear/temper-motif-style/pages/systres-guardian.temper-motif-style.ts"
import { trinimac } from "akasha/temper/catalog/gear/temper-motif-style/pages/trinimac.temper-motif-style.ts"
import { waywardGuardian } from "akasha/temper/catalog/gear/temper-motif-style/pages/wayward-guardian.temper-motif-style.ts"
import { westWealdLegion } from "akasha/temper/catalog/gear/temper-motif-style/pages/west-weald-legion.temper-motif-style.ts"
import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"
import { temperScribingSource } from "akasha/temper/catalog/skill/temper-scribing-source/temper-scribing-source.page-type.ts"

export const SCRIBING_SOURCE_MOTIF_STYLES: readonly TemperMotifStyle[] = [
  anequina,
  apostle,
  arkthzandArmory,
  ashlander,
  blackFinLegion,
  blackreachVanguard,
  deadKeeper,
  deadWater,
  dragonguard,
  draugr,
  ebonshadow,
  elderArgonian,
  fargraveGuardian,
  firesong,
  greymoor,
  houseHexos,
  houseMornard,
  ivoryBrigade,
  malacath,
  moragTong,
  nighthollow,
  pellitine,
  sapiarch,
  shardborn,
  shieldOfSenchal,
  steadfastSociety,
  systresGuardian,
  trinimac,
  waywardGuardian,
  westWealdLegion,
]

export function motifStylesDroppedBy(scribingSourceSlug: string): readonly TemperMotifStyle[] {
  const address = `${temperScribingSource.slug}/${scribingSourceSlug}`
  return SCRIBING_SOURCE_MOTIF_STYLES.filter(
    (style) => style.dropSources?.includes(address) === true
  )
}
