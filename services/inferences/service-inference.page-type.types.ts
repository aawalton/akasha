import type { InferenceHost } from "akasha/services/inferences/properties/inference-host.text-property.types.ts"
import type { InternalPort } from "akasha/services/inferences/properties/internal-port.number-property.types.ts"
import type { Lifecycle } from "akasha/services/inferences/properties/lifecycle.text-property.types.ts"
import type { Provision } from "akasha/services/inferences/properties/provision.relation-property.types.ts"
import type { PythonVersion } from "akasha/services/inferences/properties/python-version.text-property.types.ts"
import type { Warm } from "akasha/services/inferences/properties/warm.boolean-property.types.ts"
import type { Workdir } from "akasha/services/inferences/properties/workdir.text-property.types.ts"
import type { Service } from "akasha/services/service.page-type.types.ts"
import type { Enabled } from "akasha/services/workstation-services/properties/enabled.boolean-property.types.ts"
import type { Port } from "akasha/services/workstation-services/properties/port.number-property.types.ts"
import type { Runs } from "akasha/services/workstation-services/properties/runs.text-property.types.ts"

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
