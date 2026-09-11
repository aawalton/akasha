import {
  besideOf,
  pageOf,
} from "akasha/infrastructure/container-image/recipe-page/recipe-page.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const MODULE = "module"

const PROMOTER = "promote-keeps"

const CODE = "code"

export function ranBy(given: string | Reading): string {
  return besideOf(pageOf(given, MODULE, PROMOTER), CODE)
}

export function extensionsIn(given: string | Reading): string {
  const lines = [
    "{",
    '  "_comment": "postgres gfs-promoter CronJob — bun-service 2-stage build extended with python3 + pip and barman[cloud] pinned to 3.18.0, the exact version inside the plugin-barman-cloud sidecar (ghcr.io/cloudnative-pg/plugin-barman-cloud-sidecar:v0.12.0), so KEEP annotations are written/read by the identical code the plugin\'s retention enforcement runs. Re-pin in lockstep when the sidecar rev-bumps. py3-psycopg2 is barman\'s psycopg2 dependency prebuilt by apk — pip has no musl wheel and the alpine image has no gcc/pg_config to build one, so pip must find it already satisfied. tini forwards SIGTERM to the Bun process; ca-certificates for TLS. rclone serves the longtail placement job\'s S3 reads + copies (copy-longtail, added at :r3).",',
    '  "system_packages": ["ca-certificates", "tini", "python3", "py3-pip", "py3-psycopg2", "rclone"],',
    '  "extra_run_commands": [',
    "    \"RUN pip3 install --break-system-packages 'barman[cloud]==3.18.0'\"",
    "  ],",
    '  "runtime_cmd": [',
    '    "/sbin/tini",',
    '    "--",',
    '    "bun",',
    '    "run",',
    `    "${ranBy(given)}"`,
    "  ]",
    "}",
  ]
  return `${lines.join("\n")}\n`
}
