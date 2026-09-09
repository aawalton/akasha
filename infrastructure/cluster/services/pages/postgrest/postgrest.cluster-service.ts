import type { ClusterService } from "../../cluster-service.page-type.ts"

export const postgrest = {
  id: "01a06812-2380-7ab2-8db6-0870f27286e6",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "postgrest",
  definition: "the server that serves the database's tables as an HTTP interface",
  resourceKind: "Deployment",
  namespace: "postgrest",
  resourceName: "postgrest",
  image: "postgrest/postgrest:v12.2.3",
  replicas: 2,
  containerPort: 3000,
  manifest: "postgrest",
  secrets: ["secret/postgrest-secrets-database-url", "secret/postgrest-secrets-pgrst-jwt-secret"],
} as const satisfies ClusterService
