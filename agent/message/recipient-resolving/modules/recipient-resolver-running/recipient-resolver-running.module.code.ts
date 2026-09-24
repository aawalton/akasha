import { listPersonHandlers } from "akasha/agent/message/recipient-resolving/modules/person-handlers/person-handlers.module.code.ts"
import {
  recipientResolverConfigBanner,
  resolveRecipientResolverConfig,
} from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-config/recipient-resolver-config.module.code.ts"
import { defaultRecipientResolverDeps } from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-deps/recipient-resolver-deps.module.code.ts"
import { assembleRecipientResolverSpecs } from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-registry/recipient-resolver-registry.module.code.ts"
import { runRecipientResolverTick } from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-tick/recipient-resolver-tick.module.code.ts"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"
import {
  listPersonaSlugs,
  listPersonaWakeSources,
} from "akasha/persona/modules/targets/persona-targets.module.code.ts"

export async function runRecipientResolverRunning(): Promise<void> {
  const ac = stopsOnSignal()

  const config = resolveRecipientResolverConfig()

  const effects = await defaultRecipientResolverDeps(ac.signal, config)

  console.log(recipientResolverConfigBanner(config))
  console.log(
    `recipient-resolver: starting tick loop pid=${process.pid} specs=dynamic (per-tick persona enumeration + explicit statics)`
  )

  while (!ac.signal.aborted) {
    try {
      const specs = await assembleRecipientResolverSpecs(
        listPersonaSlugs,
        listPersonaWakeSources,
        listPersonHandlers
      )
      await runRecipientResolverTick({ specs, ...effects })
    } catch (err) {
      console.error("recipient-resolver: tick threw:", err)
    }
    const slept = await sleptUntilStopped(config.tickMs, ac.signal)
    if (!slept) break
  }

  console.log("recipient-resolver: stopping")
}

if (import.meta.main) {
  await runRecipientResolverRunning().catch(async (err) => {
    console.error("recipient-resolver fatal:", err)
    process.exit(1)
  })
}
