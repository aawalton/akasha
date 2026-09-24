import type { workloadClass } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/workload-class.select-property.ts"

export type WorkloadClass = (typeof workloadClass.values)[number]
