import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    route("home", "routes/home.tsx"),
    route("principles", "routes/alan-web-principles/alan-web-principles.route.code.tsx"),
    route("design", "routes/alan-web-design/alan-web-design.route.code.tsx"),
    route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx"),
    route(":pageTypeSlug", "routes/page-listing.tsx"),
  ]),
  index("routes/landing.tsx"),
  route("about", "routes/about/about.route.code.tsx"),
  route("services", "routes/alan-web-services/alan-web-services.route.code.tsx"),
  route("contact", "routes/alan-web-contact/alan-web-contact.route.code.tsx"),
  route("terms", "routes/alan-web-terms/alan-web-terms.route.code.tsx"),
  route("privacy", "routes/alan-web-privacy/alan-web-privacy.route.code.tsx"),
  route("sms", "routes/alan-web-sms/alan-web-sms.route.code.tsx"),
  route("sign-in", "routes/alan-web-sign-in/alan-web-sign-in.route.code.tsx"),
  route("sign-up", "routes/alan-web-sign-up/alan-web-sign-up.route.code.tsx"),
  route("sign-out", "routes/alan-web-sign-out/alan-web-sign-out.route.code.ts"),
  route("idle", "routes/alan-web-idle/alan-web-idle.route.code.ts"),
  route("api/health", "routes/alan-web-api-health/alan-web-api-health.route.code.ts"),
  route("api/pages-ready", "routes/pages-ready/pages-ready.route.code.ts"),
  route(
    "api/live-version",
    "routes/alan-web-api-live-version/alan-web-api-live-version.route.code.ts"
  ),
  route("api/errors", "routes/alan-web-api-errors/alan-web-api-errors.route.code.ts"),
  route("api/claude-usage", "routes/claude-usage/claude-usage.route.code.ts"),
  route("api/inbox-stoplights", "routes/inbox-stoplights/inbox-stoplights.route.code.ts"),
  route("api/habit-stoplights", "routes/habit-stoplights/habit-stoplights.route.code.ts"),
  route("api/attribute-stoplights", "attribute-stoplights/attribute-stoplights.module.code.ts"),
  route("api/surplus", "routes/surplus/surplus.route.code.ts"),
  route("api/safety-level", "routes/safety-level/safety-level.route.code.ts"),
  route("api/categorization", "routes/categorization/categorization.route.code.ts"),
  route("api/readout-relay", "routes/readout-relay/readout-relay.route.code.ts"),
  route("api/widget-tap", "routes/widget-tap/widget-tap.route.code.ts"),
  route("api/sms/webhook", "routes/api.sms.webhook.ts"),
  route("api/sms/opt-in", "routes/api.sms.opt-in.ts"),
  route("api/spotify/callback", "routes/api.spotify.callback.ts"),
  route("api/page-types", "routes/alan-web-api-page-types/alan-web-api-page-types.route.code.ts"),
  route("api/pages/:pageTypeSlug", "routes/alan-web-api-pages/alan-web-api-pages.route.code.ts"),
  route("api/page-write", "routes/alan-web-api-page-write/alan-web-api-page-write.route.code.ts"),
  route(
    "api/nav-icon/:idSuffix",
    "routes/alan-web-api-nav-icon/alan-web-api-nav-icon.route.code.ts"
  ),
  route("api/image/:imageId", "routes/alan-web-api-image/alan-web-api-image.route.code.ts"),
  route("api/wallpaper", "routes/wallpaper/wallpaper.route.code.ts"),
  route(
    "api/property-option",
    "routes/alan-web-api-property-option/alan-web-api-property-option.route.code.ts"
  ),
  route("api/media/token", "routes/api.media.token.ts"),
  route(
    "api/media/:pageId/variants",
    "routes/alan-web-api-media-variants/alan-web-api-media-variants.route.code.ts"
  ),
  route(
    "api/media/:pageId/:medium/stream",
    "routes/alan-web-api-media-stream/alan-web-api-media-stream.route.code.ts"
  ),
  route(
    "api/media/:pageId/:medium/ensure",
    "routes/alan-web-api-media-ensure/alan-web-api-media-ensure.route.code.ts"
  ),
  route(
    "api/media/:pageId/:medium/marks",
    "routes/alan-web-api-media-marks/alan-web-api-media-marks.route.code.ts"
  ),
  route(
    "api/media/:pageId/:medium/hls.m3u8",
    "routes/alan-web-api-media-hls-playlist/alan-web-api-media-hls-playlist.route.code.ts"
  ),
  route(
    "api/media/:pageId/:medium/hls/:segment",
    "routes/alan-web-api-media-hls-segment/alan-web-api-media-hls-segment.route.code.ts"
  ),
  route("api/media/:pageId/:medium", "routes/alan-web-api-media/alan-web-api-media.route.code.ts"),
  route("api/load", "routes/api.load.ts"),
  route("api/save", "routes/api.save.ts"),
  route("api/catalog", "routes/alan-web-api-catalog/alan-web-api-catalog.route.code.ts"),
  route(
    "api/chess/analyze",
    "routes/alan-web-api-chess-analyze/alan-web-api-chess-analyze.route.code.ts"
  ),

  route("api/push/register", "routes/api.push.register.ts"),

  route(
    "api/device-secret/admission",
    "routes/device-secret-admission/device-secret-admission.route.code.ts"
  ),
  route("api/device-secret/mint", "routes/api.device-secret.mint.ts"),
  route("api/device-secret/revoke", "routes/api.device-secret.revoke.ts"),

  route("api/tracking/health-samples", "routes/api.tracking.health-samples.ts"),

  route("api/*", "routes/no-such-route/no-such-route.route.code.ts"),
] satisfies RouteConfig
