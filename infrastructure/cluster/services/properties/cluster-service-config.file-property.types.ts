import type { clusterServiceConfig } from "akasha/infrastructure/cluster/services/properties/cluster-service-config.file-property.ts"

export type ClusterServiceConfig = (typeof clusterServiceConfig.extensions)[number]
