import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    index("routes/atlas-home/atlas-home.route.code.tsx"),
    route("search", "routes/search.tsx"),
    route("map", "routes/map.tsx"),
    route("trip/:tripParam", "routes/trip.tsx"),
    route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx"),
    route(":pageTypeSlug", "routes/page-listing.tsx"),
  ]),
  route("sign-in", "routes/atlas-sign-in/atlas-sign-in.route.code.tsx"),
  route("sign-up", "routes/atlas-sign-up/atlas-sign-up.route.code.tsx"),
  route("sign-out", "routes/atlas-sign-out/atlas-sign-out.route.code.ts"),
  route("api/health", "routes/atlas-api-health/atlas-api-health.route.code.ts"),
  route("api/live-version", "routes/atlas-api-live-version/atlas-api-live-version.route.code.ts"),
  route("api/errors", "routes/atlas-api-errors/atlas-api-errors.route.code.ts"),
  route("api/page-types", "routes/atlas-api-page-types/atlas-api-page-types.route.code.ts"),
  route("api/pages/:pageTypeSlug", "routes/atlas-api-pages/atlas-api-pages.route.code.ts"),
  route("api/page-write", "routes/atlas-api-page-write/atlas-api-page-write.route.code.ts"),
  route("api/nav-icon/:idSuffix", "routes/atlas-api-nav-icon/atlas-api-nav-icon.route.code.ts"),
  route("basemap/na-eu.pmtiles", "routes/atlas-basemap-na-eu/atlas-basemap-na-eu.route.code.ts"),
  route(
    "api/places/search",
    "routes/atlas-api-places-search/atlas-api-places-search.route.code.ts"
  ),
  route("api/places/add", "routes/api.places.add.ts"),
  route("api/locations/ingest", "routes/api.locations.ingest.ts"),
] satisfies RouteConfig
