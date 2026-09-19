import {
  addressesDeclared,
  forwardedTo,
  type Plan,
  plannedOver,
  type RoutingRule,
  type RuleToWrite,
  saidOf,
} from "akasha/alan/harness/email-routing/modules/email-rule-planning/email-rule-planning.module.code.ts"
import {
  rulesIn,
  tokenStated,
  writeRule,
  zoneIdOf,
} from "akasha/alan/harness/email-routing/modules/email-zone-reaching/email-zone-reaching.module.code.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { personasStanding } from "akasha/persona/modules/reading/persona-reading.module.code.ts"

const ZONE = "alanwalton.com"

export interface Reaching {
  readonly rules: () => Promise<readonly RoutingRule[]>
  readonly write: (rule: RuleToWrite) => Promise<undefined>
}

export async function reconciledOver(
  declared: readonly string[],
  reaching: Reaching,
  done: string[] = []
): Promise<Plan> {
  const rules = await reaching.rules()
  const plan = plannedOver(declared, rules, forwardedTo(rules))
  for (const one of plan.writing) {
    await reaching.write(one.rule)
    done.push(`routed ${one.address}`)
  }
  return plan
}

function reachingZone(token: string, zoneId: string): Reaching {
  return {
    rules: () => rulesIn(token, zoneId),
    write: (rule) => writeRule(token, zoneId, rule),
  }
}

export async function runPersonaRouting(done: string[] = []): Promise<undefined> {
  const root = rootStated(process.env) ?? process.cwd()
  const token = tokenStated()
  const reaching = reachingZone(token, await zoneIdOf(token, ZONE))
  const declared = addressesDeclared(personasStanding(root), ZONE)
  const plan = await reconciledOver(declared, reaching, done)
  process.stdout.write(`${saidOf(plan).join("\n")}\n`)
}

if (import.meta.main) {
  await runPersonaRouting()
}
