import { index, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  index("routes/innworld-home/innworld-home.route.code.tsx"),
  route("api/health", "routes/innworld-api-health/innworld-api-health.route.code.ts"),
] satisfies RouteConfig
