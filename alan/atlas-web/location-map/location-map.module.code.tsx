import "maplibre-gl/dist/maplibre-gl.css"
import type { StyleSpecification } from "maplibre-gl"
import { useEffect, useRef } from "react"
import type { LocationPin } from "../pins/pins.module.code.ts"

type LocationMapProps = {
  points: readonly LocationPin[]
  basemapUrl: string | null
}

const GLYPHS_URL = "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf"
const SPRITE_URL = "https://protomaps.github.io/basemaps-assets/sprites/v4/light"
const OSM_ATTRIBUTION =
  '<a href="https://openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a>'
const FALLBACK_BACKGROUND = "#e6e4df"

export function LocationMap({ points, basemapUrl }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    let cancelled = false
    let cleanup: (() => void) | null = null

    void (async () => {
      const maplibregl = (await import("maplibre-gl")).default
      const { Protocol } = await import("pmtiles")
      const { layers, namedFlavor } = await import("@protomaps/basemaps")
      if (cancelled) return

      const protocol = basemapUrl !== null ? new Protocol() : null
      if (protocol !== null) maplibregl.addProtocol("pmtiles", protocol.tile)

      const style: StyleSpecification =
        basemapUrl !== null
          ? {
              version: 8,
              glyphs: GLYPHS_URL,
              sprite: SPRITE_URL,
              sources: {
                protomaps: {
                  type: "vector",
                  url: `pmtiles://${basemapUrl}`,
                  attribution: OSM_ATTRIBUTION,
                },
              },
              layers: layers("protomaps", namedFlavor("light"), { lang: "en" }),
            }
          : {
              version: 8,
              sources: {},
              layers: [
                {
                  id: "background",
                  type: "background",
                  paint: { "background-color": FALLBACK_BACKGROUND },
                },
              ],
            }

      const firstPoint = points[0]
      const map = new maplibregl.Map({
        container,
        style,
        center: firstPoint !== undefined ? [firstPoint.longitude, firstPoint.latitude] : [0, 20],
        zoom: firstPoint !== undefined ? 4 : 1,
        attributionControl: { compact: true },
      })
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right")

      const rootStyle = getComputedStyle(document.documentElement)
      const resolveToken = (token: string): string | undefined => {
        const value = rootStyle.getPropertyValue(token).trim()
        return value.length > 0 ? value : undefined
      }

      const markers = points.map((p) => {
        const label = p.address !== undefined ? `${p.title} — ${p.address}` : p.title
        const popup = new maplibregl.Popup({ offset: 24 }).setText(label)
        const color = p.colorToken !== undefined ? resolveToken(p.colorToken) : undefined
        const marker =
          color !== undefined ? new maplibregl.Marker({ color }) : new maplibregl.Marker()
        return marker.setLngLat([p.longitude, p.latitude]).setPopup(popup).addTo(map)
      })

      if (points.length > 1) {
        const bounds = new maplibregl.LngLatBounds()
        for (const p of points) bounds.extend([p.longitude, p.latitude])
        map.fitBounds(bounds, { padding: 64, maxZoom: 12, duration: 0 })
      } else if (points.length === 1) {
        map.setZoom(11)
      }

      cleanup = () => {
        for (const m of markers) m.remove()
        map.remove()
        if (protocol !== null) maplibregl.removeProtocol("pmtiles")
      }
      if (cancelled) cleanup()
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [points, basemapUrl])

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      data-testid="atlas-map-root"
      role="region"
      aria-label="Map of your saved locations"
    />
  )
}
