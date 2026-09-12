import type { InferenceHost } from "akasha/infrastructure/services/inferences/properties/inference-host.text-property.types.ts"
import type { InternalPort } from "akasha/infrastructure/services/inferences/properties/internal-port.number-property.types.ts"
import type { Lifecycle } from "akasha/infrastructure/services/inferences/properties/lifecycle.text-property.types.ts"
import type { Provision } from "akasha/infrastructure/services/inferences/properties/provision.relation-property.types.ts"
import type { PythonVersion } from "akasha/infrastructure/services/inferences/properties/python-version.text-property.types.ts"
import type { Runs } from "akasha/infrastructure/services/inferences/properties/runs.text-property.types.ts"
import type { Warm } from "akasha/infrastructure/services/inferences/properties/warm.boolean-property.types.ts"
import type { Workdir } from "akasha/infrastructure/services/inferences/properties/workdir.text-property.types.ts"
import type { Service } from "akasha/infrastructure/services/service.page-type.types.ts"
import type { Enabled } from "akasha/infrastructure/services/workstations/properties/enabled.boolean-property.types.ts"
import type { Port } from "akasha/infrastructure/services/workstations/properties/port.number-property.types.ts"

export type ServiceInference = Service & {
  host: InferenceHost
  provision: Provision
  pythonVersion: PythonVersion
  workdir: Workdir
  runs: Runs
  enabled: Enabled
  port: Port
  internalPort?: InternalPort
  lifecycle: Lifecycle
  warm?: Warm
}
