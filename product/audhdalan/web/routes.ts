import { index, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  index("routes/audhdalan-home/audhdalan-home.route.code.tsx"),
  route("autcon-2026", "routes/audhdalan-autcon-2026/audhdalan-autcon-2026.route.code.tsx"),
  route("safety-levels", "routes/audhdalan-safety-levels/audhdalan-safety-levels.route.code.tsx"),
  route("api/health", "routes/audhdalan-api-health/audhdalan-api-health.route.code.ts"),
  route("api/image/:slug", "routes/audhdalan-api-image/audhdalan-api-image.route.code.ts"),
  route("api/errors", "routes/audhdalan-api-errors/audhdalan-api-errors.route.code.ts"),
  route("api/subscribe", "routes/audhdalan-api-subscribe/audhdalan-api-subscribe.route.code.ts"),
  route(
    "api/page-events",
    "routes/audhdalan-api-page-events/audhdalan-api-page-events.route.code.ts"
  ),
  route(
    "api/page-follow",
    "routes/audhdalan-api-page-follow/audhdalan-api-page-follow.route.code.ts"
  ),
] satisfies RouteConfig
