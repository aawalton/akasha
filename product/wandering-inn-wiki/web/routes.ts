import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    index("routes/innworld-home/innworld-home.route.code.tsx"),
    route(
      ":pageTypeSlug/:pageHrefParam",
      "routes/innworld-page-detail/innworld-page-detail.route.code.tsx"
    ),
    route(":pageTypeSlug", "routes/innworld-page-listing/innworld-page-listing.route.code.tsx"),
  ]),
  route("api/health", "routes/innworld-api-health/innworld-api-health.route.code.ts"),
  route(
    "api/live-version",
    "routes/innworld-api-live-version/innworld-api-live-version.route.code.ts"
  ),
  route("api/page-types", "routes/innworld-api-page-types/innworld-api-page-types.route.code.ts"),
  route("api/pages/:pageTypeSlug", "routes/innworld-api-pages/innworld-api-pages.route.code.ts"),
] satisfies RouteConfig
