import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import {
  CONTROL_PLANE_LABELS,
  NAMESPACE,
} from "../headscale-constants/headscale-constants.module.code.ts"

const HEADSCALE_CONFIG_YAML = `server_url: https://headscale.alanwalton.com
listen_addr: 0.0.0.0:8443
metrics_listen_addr: 0.0.0.0:9090
grpc_listen_addr: 0.0.0.0:50443
grpc_allow_insecure: false

# TLS cert/key come from cert-manager via the headscale-tls Secret, renewed
# automatically from Let's Encrypt through the Cloudflare DNS-01 solver.
tls_cert_path: /headscale-tls/tls.crt
tls_key_path: /headscale-tls/tls.key

noise:
  private_key_path: /headscale-secrets/noise_private_key

prefixes:
  v4: 100.64.0.0/10
  v6: fd7a:115c:a1e0::/48
  allocation: sequential

derp:
  server:
    enabled: false
  urls:
    - https://controlplane.tailscale.com/derpmap/default
  auto_update_enabled: true
  update_frequency: 24h

disable_check_updates: true
ephemeral_node_inactivity_timeout: 30m

database:
  type: sqlite
  sqlite:
    path: /var/lib/headscale/db.sqlite
    # WAL mode is Litestream's prerequisite — it streams the WAL to SeaweedFS
    # S3. wal_autocheckpoint lets headscale truncate the WAL periodically;
    # Litestream observes checkpoints but never checkpoints the DB itself.
    write_ahead_log: true
    wal_autocheckpoint: 1000

log:
  format: json
  level: info

dns:
  magic_dns: true
  base_domain: alanwalton.ts.net
  nameservers:
    global:
      - 1.1.1.1
      - 8.8.8.8
    split:
      svc.cluster.local:
        - 10.96.0.10
      cluster.local:
        - 10.96.0.10

unix_socket: /var/run/headscale/headscale.sock
unix_socket_permission: "0770"

oidc:
  only_start_if_oidc_is_available: true
  issuer: https://accounts.google.com
  client_id: 221653974285-v784u0625d71btotcrr66u3c5qvkp8ru.apps.googleusercontent.com
  client_secret_path: /headscale-secrets/oidc_client_secret
  expiry: 180d
  use_expiry_from_token: false
  scope:
    - openid
    - profile
    - email
  allowed_users:
    - aawalton@gmail.com

policy:
  mode: file
  path: /headscale-policy/policy.hujson
`

const HEADSCALE_POLICY_HUJSON = `{
  "acls": [
    { "action": "accept", "src": ["*"], "dst": ["*:*"] }
  ],
  "autoApprovers": {
    "routes": {
      "10.96.0.0/12": ["infra@"],
      "10.244.0.0/16": ["infra@"]
    }
  }
}
`

const LITESTREAM_CONFIG_YAML = `dbs:
  - path: /var/lib/headscale/db.sqlite
    replica:
      type: s3
      bucket: headscale-db
      path: db
      endpoint: http://s3-gateway.seaweedfs.svc.cluster.local:8333
      region: us-east-1
      force-path-style: true
`

export function configmapYaml(): string {
  return synthOne(NAMESPACE, "configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "headscale-config",
      namespace: NAMESPACE,
      labels: CONTROL_PLANE_LABELS,
    },
    data: {
      "config.yaml": HEADSCALE_CONFIG_YAML,
    },
  })
}

export function policyConfigmapYaml(): string {
  return synthOne(NAMESPACE, "policy-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "headscale-policy",
      namespace: NAMESPACE,
      labels: CONTROL_PLANE_LABELS,
    },
    data: {
      "policy.hujson": HEADSCALE_POLICY_HUJSON,
    },
  })
}

export function litestreamConfigmapYaml(): string {
  return synthOne(NAMESPACE, "litestream-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "headscale-litestream",
      namespace: NAMESPACE,
      labels: CONTROL_PLANE_LABELS,
    },
    data: {
      "litestream.yml": LITESTREAM_CONFIG_YAML,
    },
  })
}
