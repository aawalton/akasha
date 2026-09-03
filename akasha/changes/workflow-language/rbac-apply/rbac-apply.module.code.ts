import { IMAGES } from "../images/images.module.code.ts"
import type { Step } from "../workflow-types/workflow-types.module.code.ts"

interface ApplyRbacConfig {
  name: string
  rbacFile: string
}

export function applyRbac(config: ApplyRbacConfig): Step {
  const { name, rbacFile } = config

  return {
    name,
    image: IMAGES.CI,
    environment: { HOME: "/tmp" },
    commands: [
      "set -e",
      `[ -n "$AKASHA_ROOT" ] || { echo "ERROR: applying ${rbacFile} needs AKASHA_ROOT, and this step container was given none, so the profiles it would grant cannot be read" >&2; exit 1; }`,
      `[ -f "$AKASHA_ROOT/${rbacFile}" ] || { echo "ERROR: ${rbacFile} does not stand in the akasha tree at $AKASHA_ROOT, so the role it declares would be skipped rather than applied" >&2; exit 1; }`,
      `bun -e "
const mod = await import('$AKASHA_ROOT/${rbacFile}');
const profiles = mod.profiles ?? mod.default;
if (!Array.isArray(profiles) || profiles.length === 0) {
  throw new Error('${rbacFile} exports no profiles, so this step would apply an empty document and report success');
}
const { LABELS } = await import('$AKASHA_ROOT/akasha/infrastructure/cluster-manifests/rbac-identity/rbac-identity.module.code.ts');
function inlineArray(arr) { return '[' + arr.map(s => '\\"' + s + '\\"').join(', ') + ']'; }
function formatLabels(indent, labels) {
  const pad = ' '.repeat(indent);
  return Object.entries(labels).map(([k, v]) => pad + k + ': ' + v).join('\\n');
}
function formatRule(rule) {
  const lines = [];
  if (rule.comment) lines.push('  # ' + rule.comment);
  lines.push('  - apiGroups: ' + inlineArray(rule.apiGroups));
  lines.push('    resources: ' + (rule.resourcesRaw ?? inlineArray(rule.resources)));
  lines.push('    verbs: ' + inlineArray(rule.verbs));
  if (rule.resourceNames) {
    lines.push('    resourceNames:');
    for (const n of rule.resourceNames) lines.push('      - ' + n);
  }
  return lines.join('\\n');
}
const sections = [];
for (const p of profiles) {
  const rulesStr = p.rules.map(formatRule).join('\\n');
  sections.push('apiVersion: rbac.authorization.k8s.io/v1\\nkind: Role\\nmetadata:\\n  name: ' + p.roleName + '\\n  namespace: ' + p.namespace + '\\n  labels:\\n' + formatLabels(4, LABELS) + '\\nrules:\\n' + rulesStr);
  sections.push('apiVersion: rbac.authorization.k8s.io/v1\\nkind: RoleBinding\\nmetadata:\\n  name: ' + p.roleName + '\\n  namespace: ' + p.namespace + '\\n  labels:\\n' + formatLabels(4, LABELS) + '\\nroleRef:\\n  apiGroup: rbac.authorization.k8s.io\\n  kind: Role\\n  name: ' + p.roleName + '\\nsubjects:\\n  - kind: ServiceAccount\\n    name: pipeline-engine\\n    namespace: ci');
}
console.log(sections.join('\\n---\\n'));
" > /tmp/rbac.yaml`,
      "kubectl apply -f /tmp/rbac.yaml",
    ],
    backendOptions: {
      kubernetes: { serviceAccountName: "pipeline-engine" },
    },
  }
}
