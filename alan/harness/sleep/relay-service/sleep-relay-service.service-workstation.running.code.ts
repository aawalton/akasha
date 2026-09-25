import { carryReadingsServedBy } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { sleepRelayService } from "akasha/alan/harness/sleep/relay-service/sleep-relay-service.service-workstation.ts"
import { serviceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const SERVED_BY = namedAs(serviceWorkstation.slug, sleepRelayService.slug, null)

export async function runService(): Promise<void> {
  await carryReadingsServedBy(SERVED_BY)
}
