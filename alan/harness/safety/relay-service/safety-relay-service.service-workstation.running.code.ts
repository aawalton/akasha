import { carryReadingsServedBy } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { safetyRelayService } from "akasha/alan/harness/safety/relay-service/safety-relay-service.service-workstation.ts"
import { serviceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const SERVED_BY = namedAs(serviceWorkstation.slug, safetyRelayService.slug, null)

export async function runService(): Promise<void> {
  await carryReadingsServedBy(SERVED_BY)
}
