import { attributeCharisma } from "akasha/alan/attribute/readout/attribute-charisma/attribute-charisma.readout.ts"
import { attributeConstitution } from "akasha/alan/attribute/readout/attribute-constitution/attribute-constitution.readout.ts"
import { attributeEndurance } from "akasha/alan/attribute/readout/attribute-endurance/attribute-endurance.readout.ts"
import { attributeIntelligence } from "akasha/alan/attribute/readout/attribute-intelligence/attribute-intelligence.readout.ts"
import { attributeLuck } from "akasha/alan/attribute/readout/attribute-luck/attribute-luck.readout.ts"
import { attributeStrength } from "akasha/alan/attribute/readout/attribute-strength/attribute-strength.readout.ts"
import { attributeWisdom } from "akasha/alan/attribute/readout/attribute-wisdom/attribute-wisdom.readout.ts"
import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"

const TO = "https://alanwalton.com"

const CARRIES = [
  { point: `${readout.slug}/${attributeStrength.slug}`, to: TO },
  { point: `${readout.slug}/${attributeEndurance.slug}`, to: TO },
  { point: `${readout.slug}/${attributeConstitution.slug}`, to: TO },
  { point: `${readout.slug}/${attributeWisdom.slug}`, to: TO },
  { point: `${readout.slug}/${attributeIntelligence.slug}`, to: TO },
  { point: `${readout.slug}/${attributeCharisma.slug}`, to: TO },
  { point: `${readout.slug}/${attributeLuck.slug}`, to: TO },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
