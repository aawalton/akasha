import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"
import type { InferenceHost } from "akasha/infrastructure/service/akasha-service/service-inference/properties/inference-host.relation-property.types.ts"
import type { InternalPort } from "akasha/infrastructure/service/akasha-service/service-inference/properties/internal-port.number-property.types.ts"
import type { Lifecycle } from "akasha/infrastructure/service/akasha-service/service-inference/properties/lifecycle.relation-property.types.ts"
import type { Provision } from "akasha/infrastructure/service/akasha-service/service-inference/properties/provision.relation-property.types.ts"
import type { PythonVersion } from "akasha/infrastructure/service/akasha-service/service-inference/properties/python-version.text-property.types.ts"
import type { Runs } from "akasha/infrastructure/service/akasha-service/service-inference/properties/runs.text-property.types.ts"
import type { Warm } from "akasha/infrastructure/service/akasha-service/service-inference/properties/warm.boolean-property.types.ts"
import type { Workdir } from "akasha/infrastructure/service/akasha-service/service-inference/properties/workdir.text-property.types.ts"
import type { Enabled } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/enabled.boolean-property.types.ts"
import type { Port } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/port.number-property.types.ts"

export type ServiceInference = AkashaService & {
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
