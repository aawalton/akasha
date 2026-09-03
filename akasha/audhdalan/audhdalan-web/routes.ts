import { index, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("autcon-2026", "routes/autcon-2026.tsx"),
  route("safety-levels", "routes/safety-levels.tsx"),
  route("api/health", "routes/api.health.ts"),
  route("api/errors", "routes/api.errors.ts"),
  route("api/subscribe", "routes/api.subscribe.ts"),
] satisfies RouteConfig
